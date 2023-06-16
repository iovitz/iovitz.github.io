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

这里创建的只是一个空架子项目，如果需要添加Eslint或者Prettier等一些前端工程质量相关的建设，可以参考{% post_link 前端工程质量 前端工程质量 %}



# 工具方法

## 网络请求

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