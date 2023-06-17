---
title: UniApp最佳实践
author: 不锈钢盆
date: 2023-06-14 19:27:47
description: UniApp笔记
categories: 前端
tags:
  - UniApp
  - 跨端开发
---

# 初始化项目

这里的uniapp项目使用vue3和typescript进行编写，要初始化一个uniapp+vue3+typescript的项目，可以使用vue的脚手架来选择模版进行创建

先安装vue脚手架

```shell
npm install -g @vue/cli
```

然后通过脚手架选择uniapp+vue3+tpescript的模板进行创建

```shell
vue create -p dcloudio/uni-preset-vue#vue3 <project-name>
```

项目创建好之后，如果需要添加Eslint或者Prettier等一些前端工程质量相关的建设，可以参考{% post_link 前端工程质量 前端工程质量 %}

项目的包管理工具推荐实用`pnpm`，因为真的很好用！

# 最佳实践

## ACSS

acss能够为样式开发带来很大的便捷，这里推荐的ACSS样式方案是Bootstrap的Style Utilities

## 状态管理

[vuex](https://vuex.vuejs.org/zh/)和[pinia](https://pinia.vuejs.org/)都是很优秀的状态管理库，不过这里推荐实用pinia，vuex用起来巨麻烦！！！修改一个store可能要改动到多个文件，而且对typescript的支持也很差。pinia有比较好的typescript支持，而且使用起来很灵活，推荐！

安装pinia

```shell
pnpm i pinia
```

同时建议安装`pinia-plugin-persistedstate`这个库，用来做状态持久化

```shell
pnpm i pinia-plugin-persistedstate
```

建议使用pinia作为

```ts
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const pinia = createPinia();

// 数据持久化
pinia.use(
  createPersistedState({
    storage: {
      getItem(key: string): string | null {
        key = 'pinia_store_' + key
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        key = 'pinia_store_' + key
        uni.setStorageSync(key, value)
      },
    },
  }),
)
```

## 网络请求

### HTTP

为了保持跨端良好的兼容性，uniapp中提供了封装好的支持跨端的网络请求接口`uni.request`，网页中的`axios`库无法在uniapp中正常工作，所以这里封装一个类用来统一处理请求的发送

```ts
type Header = Record<string, string>;
interface RequestConfig {
    baseURL: string;
    timeout: number;
    header: Header;
}

// 前后端约定好的Response数据结构
interface Response<T = any> {
    code: number;
    data: T;
    message: string;
}

class ShortChain {
    private config: RequestConfig;

    constructor(config: RequestConfig) {
        this.config = config;
    }

    public setHeader(key: string, value: string) {
        this.config.header[key] = value;
    }

    public delHeader(key: string) {
        delete this.config.header[key];
    }

    private request(
        method: UniNamespace.RequestOptions['method'],
        url: string,
        data: any,
        requestHeader: Header = {}
    ) {
        return new Promise<UniApp.RequestSuccessCallbackResult>((success, fail) => {
            const { header, baseURL, timeout } = this.config;
            uni.request({
                url: baseURL + url,
                data,
                method,
                success,
                fail,
                timeout,
                header: {
                    ...header,
                    ...requestHeader,
                },
            });
        }).then((res: UniApp.RequestSuccessCallbackResult) => {
            const data = res.data as any;
            if (data.code !== 0) {
                uni.showToast({
                    icon: 'error',
                    title: data.message,
                });
            }
            return data;
        });
    }

    public get<T = unknown>(url: string, data: any = {}, header: Header = {}) {
        return this.request('GET', url, data, header) as Promise<Response<T>>;
    }

    public post<T = unknown>(url: string, data: any = {}, header: Header = {}) {
        return this.request('POST', url, data, header) as Promise<Response<T>>;
    }
}
```

### Web Socket

```ts

```

## 存储

对storage进行一些封装，原生Storage直接使用的话不安全，本地存储满了的话，回导致线上白屏，所以这里简单进行一层封装

```ts
class Storage {

  /**
   * set storage
   * @param key storage key
   * @param val storage value
   * @param safely 出错时是否抛出异常
   */
  public set(key: string, val: any, safely = true) {
    try {
      val = typeof val === 'string' ? val : JSON.stringify(val)
      uni.setStorageSync(key, val)
    } catch (e) {
      if (!safely) {
        // TODO Report
        throw e
      }
    }
  }


  /**
   * get storage
   * @param key storage key
   */
  public get<T = any>(key: string): T | null {
    const val = uni.getStorageSync(key) as T
    return val || null
  }

  /**
   * remove storage item
   * @param {string} key storage key
   */
  public remove(key: string) {
    uni.removeStorageSync(key)
  }

  /**
   * is storage has key
   * @param {string} key 需要查询的key
   * @return {boolean} 查询结果
   */
  public has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 清空本地存储
   */
  public clear() {
    uni.clearStorageSync()
  }
}
```

# 稳定性