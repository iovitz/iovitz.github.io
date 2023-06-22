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

这里的 uniapp 项目使用 vue3 和 typescript 进行编写，要初始化一个 uniapp+vue3+typescript 的项目，可以使用 vue 的脚手架来选择模版进行创建

先安装 vue 脚手架

```shell
npm install -g @vue/cli
```

然后通过脚手架选择 uniapp+vue3+tpescript 的模板进行创建

```shell
vue create -p dcloudio/uni-preset-vue#vue3 <project-name>
```

项目创建好之后，如果需要添加 Eslint 或者 Prettier 等一些前端工程质量相关的建设，可以参考{% post_link 前端工程质量 前端工程质量 %}

项目的包管理工具推荐实用`pnpm`，因为真的很好用！

# 最佳实践

## ACSS

acss 能够为样式开发带来很大的便捷，这里推荐的 ACSS 样式方案是 Bootstrap 的 Style Utilities

## 状态管理

[vuex](https://vuex.vuejs.org/zh/)和[pinia](https://pinia.vuejs.org/)都是很优秀的状态管理库，不过这里推荐实用 pinia，vuex 用起来巨麻烦！！！修改一个 store 可能要改动到多个文件，而且对 typescript 的支持也很差。pinia 有比较好的 typescript 支持，而且使用起来很灵活，推荐！

安装 pinia

```shell
pnpm i pinia
```

同时建议安装`pinia-plugin-persistedstate`这个库，用来做状态持久化

```shell
pnpm i pinia-plugin-persistedstate
```

建议使用 pinia 作为

```ts
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

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
  })
)
```

## 网络请求

### HTTP

为了保持跨端良好的兼容性，uniapp 中提供了封装好的支持跨端的网络请求接口`uni.request`，网页中的`axios`库无法在 uniapp 中正常工作，所以这里封装一个类用来统一处理请求的发送

```ts
type Header = Record<string, string>
interface RequestConfig {
  baseURL: string
  timeout: number
  header: Header
}

// 前后端约定好的Response数据结构
interface Response<T = any> {
  code: number
  data: T
  message: string
}

class ShortChain {
  private config: RequestConfig

  constructor(config: RequestConfig) {
    this.config = config
  }

  public setHeader(key: string, value: string) {
    this.config.header[key] = value
  }

  public delHeader(key: string) {
    delete this.config.header[key]
  }

  private request(method: UniNamespace.RequestOptions['method'], url: string, data: any, requestHeader: Header = {}) {
    return new Promise<UniApp.RequestSuccessCallbackResult>((success, fail) => {
      const { header, baseURL, timeout } = this.config
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
      })
    }).then((res: UniApp.RequestSuccessCallbackResult) => {
      const data = res.data as any
      if (data.code !== 0) {
        uni.showToast({
          icon: 'error',
          title: data.message,
        })
      }
      return data
    })
  }

  public get<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.request('GET', url, data, header) as Promise<Response<T>>
  }

  public post<T = unknown>(url: string, data: any = {}, header: Header = {}) {
    return this.request('POST', url, data, header) as Promise<Response<T>>
  }
}
```

### Web Socket

```ts

```

## 存储

对 storage 进行一些封装，原生 Storage 直接使用的话不安全，本地存储满了的话，回导致线上白屏，所以这里简单进行一层封装

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

# 踩坑汇总

## scroll-view 高度计算

```typescript
// 计算高度最好放在mounted中，因为init中不一定能拿到准确的参数（未加载）
mounted() {
  uni.getSystemInfo({
    success: (res) => {
      // 拿到可用window高度
      // 可用window高度 = 窗口高度 - 状态栏高度 - bottom占用（底部的tabBar高度，H5下为0，app下计算高度）
      const windowHeight =
        (res.safeArea?.height || res.windowHeight - (res.statusBarHeight ?? 0)) -
        res.windowBottom;
      // 如果有NavBar需要减去NavBar高度
      this.swiperHeight = windowHeight - uni.upx2px(100);
    },
  });
}
```

# 稳定性
