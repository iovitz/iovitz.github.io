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

```bash
npm install -g @vue/cli
```

然后通过脚手架选择 uniapp+vue3+tpescript 的模板进行创建

```bash
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

```bash
pnpm i pinia
```

同时建议安装`pinia-plugin-persistedstate`这个库，用来做状态持久化

```bash
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

## uni-ui

建议使用 [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) 作为 uni-app 的 ui 库

安装 uni-ui 和相关依赖

```bash
pnpm i @dcloudio/uni-ui
pnpm i sass sass-loader -D
```

打开项目根目录下的 pages.json 并添加 easycom 节点

```json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
		}
	},
  "pages": []
  ...
}
```

创建 uni-ui 的主题色文件 `theme.scss`

```scss
/* 主题色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color: #333; // 基本色
$uni-text-color-inverse: #fff; // 反色
$uni-text-color-grey: #999; // 辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable: #c0c0c0;

/* 背景颜色 */
$uni-bg-color: #ffffff;
$uni-bg-color-grey: #f8f8f8;
$uni-bg-color-hover: #f1f1f1; // 点击状态颜色
$uni-bg-color-mask: rgba(0, 0, 0, 0.4); // 遮罩颜色

/* 边框颜色 */
$uni-border-color: #c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm: 12px;
$uni-font-size-base: 14px;
$uni-font-size-lg: 16;

/* 图片尺寸 */
$uni-img-size-sm: 20px;
$uni-img-size-base: 26px;
$uni-img-size-lg: 40px;

/* Border Radius */
$uni-border-radius-sm: 2px;
$uni-border-radius-base: 3px;
$uni-border-radius-lg: 6px;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 5px;
$uni-spacing-row-base: 10px;
$uni-spacing-row-lg: 15px;

/* 垂直间距 */
$uni-spacing-col-sm: 4px;
$uni-spacing-col-base: 8px;
$uni-spacing-col-lg: 12px;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2c405a; // 文章标题颜色
$uni-font-size-title: 20px;
$uni-color-subtitle: #555; // 二级标题颜色
$uni-font-size-subtitle: 18px;
$uni-color-paragraph: #3f536e; // 文章段落颜色
$uni-font-size-paragraph: 15px;
```

安装好了之后需要修改一下 `vite.config.ts`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default {
  ...defineConfig({
    plugins: [uni()],
  }),

  // 这里一定要加上全局scss引入，否则会找不到变量
  // 这个问题没找到文档，我是真的试了很多方法才解决的
  css: {
    preprocessorOptions: {
      scss: {
        // 这里要引入前面创建的theme.scss文件
        additionalData: '@import "@/common/theme.scss";',
      },
    },
  },
  transpileDependencies: ['@dcloudio/uni-ui'],
}
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
