---
title: Frp内网穿透
author: 不锈钢盆
date: 2025-06-20 10:36:36
description: Frp搭建和连接的一些笔记
categories: 研发基建
tags:
  - 工程化
  - 研发基建
---

## 介绍

[FRP文档](https://gofrp.org/zh-cn/docs/)

## 服务端搭建

### 服务端配置

```
# ==============================
# FRP 服务器端（frps.ini）配置
# ==============================

# 绑定监听地址（默认 `0.0.0.0` 代表监听所有 IP）
bindAddr = "0.0.0.0"

#  服务器监听端口（客户端需要通过该端口连接 FRP 服务器）
bindPort = 7000

# HTTP 端口（用于内网 HTTP 代理穿透）
# vhostHTTPPort = 8080

# HTTPS 端口（用于内网 HTTPS 代理穿透）
# vhostHTTPSPort = 8443

# 子域名支持
# 可以通过 `subDomainHost` 解析动态子域名
# 例如：如果 `subDomainHost` 配置为 "example.com"
# 那么客户端可以使用 `test.example.com` 访问内网服务
# 如果你没有域名或不使用此功能，请删除此行！
# 如果你要用IP直连例如:168.0.0.1:8848，就把这行删掉，不要配置！
subDomainHost = "xxxx.com"  # 请替换为你的真实域名

# =============================================
# Web 控制台（Dashboard）配置
# =============================================

# 监控界面监听地址（`0.0.0.0` 代表所有 IP 可访问）
webServer.addr = "0.0.0.0"

# Web 管理面板端口（可在浏览器访问，默认 7500）
# 你可以通过 `http://你的公网IP:7500` 访问 FRP 管理面板
webServer.port = 7500

# Web 控制台管理账号（可自定义）
webServer.user = "iovitz"

# Web 控制台密码（请自行修改）
webServer.password = "a123123."

# =============================================
# 身份验证（Authentication）配置
# =============================================

#  认证方式（防止未经授权的客户端连接）
# 目前 FRP 支持 `token` 和 `oidc` 方式，我们选用token
auth.method = "token"

#  Token 认证（客户端需要匹配相同 token 才能连接）
# 通俗来说就是密码，写一个你能记住的，尽量长一点
auth.token = "a123123."   # 请自行修改，不要用我的
```

## 客户端搭建
