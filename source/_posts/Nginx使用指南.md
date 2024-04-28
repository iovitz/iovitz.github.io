---
title: Nginx学习笔记
author: 不锈钢盆
date: 2024-04-28 18:58:47
description: Nginx学习笔记
categories: 研发基建
tags:
  - Linux
  - 研发基建
---

## Nginx安装

### 准备依赖

```shell
# 一定需要先update一下，否则直接安装依赖可能会找不到包
apt-get update

# 安装依赖包
apt-get install -y perl libperl-dev libgd3 libgd-dev libgeoip1 libgeoip-dev geoip-bin libxml2 libxml2-dev libxslt1-dev libssl-dev wget gnupg2 ca-certificates libpcre3-dev build-essential
```

### 下载Nginx

进入下载目录

```shell
# 进入自己的下载目录
cd ~/downloads
```

下载指定版本的Nginx包 <http://nginx.org/download/>

```shell
wget http://nginx.org/download/nginx-1.23.3.tar.gz
```

解压下载的压缩包

```shell
# 解压，压缩包可以留着以后使用
tar -xvf nginx-1.23.3.tar.gz
```

移动目录到/usr/local中，旧的压缩包以后可能用得上

```shell
mv nginx-1.23.3 /usr/local/nginx
```

### 编译安装

进入nginx目录

```shell
cd /usr/local/nginx
```

编译

```shell
./configure --prefix=/usr/local/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--with-http_ssl_module \
--with-http_v2_module \
--with-http_realip_module \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-pcre \
--with-stream \
--with-stream_ssl_module \
--with-stream_realip_module \
--with-ipv6
```

安装

```shell
make && make install
```

Nginx常用指令
