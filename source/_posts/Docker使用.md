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

# 安装Docker

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

# 安装常用软件

创建`docker-compose.yml`文件后，填入需要安装的软件对应的文件内容，执行`docker-compose up -d`就可以了

## MySQL

```yml
version: 'latest'

services:
  mysql_db:
    container_name: 'mysql'
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - 3306:3306
    volumes:
      - /home/mysql:/var/lib/mysql
```

## MondoDB

```yml
version: 'latest'

services:
  mongo_db:
    container_name: 'mongo'
    image: mongo
    restart: always
    environment:
      # root账户用户名
      MONGO_INITDB_ROOT_USERNAME: root
      # root账户密码
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - 27017:27017
    volumes:
      - /home/mongo:/data/db
```

## Redis

```yml
version: 'latest'

services:
  redis_db:
    container_name: 'redis'
    image: redis
    command: ["redis-server", "--requirepass", "a123123."]
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
    ports:
      - 6379:6379
    volumes:
      - /home/redis:/data
```
