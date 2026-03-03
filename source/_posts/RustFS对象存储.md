---
title: RustFS对象存储
author: 不锈钢盆
date: 2026-03-03 19:48:40
description:
categories: OSS
tags:
  - RustFS
  - OSS
---

## 安装

RustFS 使用 1panel 或者 宝塔面板 进行安装就好了

## JS连接

> [官方JS文档](https://docs.rustfs.com/developer/sdk/javascript.html)

首先需要安装依赖，安装完成后可以在 node 中进行连接

```bash
npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

安装好依赖之后，就可以在代码中进行连接了

```js
import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "http://<IP>:<port>", // RustFS endpoint
  region: "cn", // Any value is accepted
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
  forcePathStyle: true, // Must be enabled for RustFS compatibility
});
```
