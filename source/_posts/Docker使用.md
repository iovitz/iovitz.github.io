---
title: Docker使用
author: 不锈钢盆
date: 2024-02-05 18:09:12
description: Docker的指令和常用软件安装脚本
categories: 研发基建
tags:
  - 工程化
  - 研发基建
---

# 安装Docker和常用软件

## 安装Docker

更新包版本

```shell
sudo apt update
sudo apt upgrade
```

安装依赖

```shell
sudo apt-get install ca-certificates curl gnupg lsb-release software-properties-common
```

添加证书

```shell
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

写入软件源信息

```shell
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

安装

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

启动

```shell
systemctl start docker
```
