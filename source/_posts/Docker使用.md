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

```bash
sudo apt update
sudo apt upgrade
```

安装依赖

```bash
sudo apt-get install ca-certificates curl gnupg lsb-release software-properties-common
```

添加证书

```bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

写入软件源信息

```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

安装

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

启动

```bash
systemctl start docker
```

# 安装常用软件

创建`docker-compose.yml`文件后，填入需要安装的软件对应的文件内容，执行`docker-compose up -d`就可以了

## MySQL

使用Docker安装MySQL，如果需要再宿主机管理配置，需要现在宿主机创建mysql的配置文件

```bash
vi ~/mysql/my.cnf
```

把下面的内容粘贴进去

```text
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/8.4/en/server-configuration-defaults.html

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M

host-cache-size=0
skip-name-resolve
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
secure-file-priv=/var/lib/mysql-files
user=mysql

pid-file=/var/run/mysqld/mysqld.pid
[client]
socket=/var/run/mysqld/mysqld.sock

!includedir /etc/mysql/conf.d/
```

我们还需要安装MySQL的可视化管理工具Adminer，这是可选的，但是太好用了，所以顺便一起安装上。并且我在开发中很喜欢使用SQLite，Adminer无法直接打开不需要密码的数据库，所以需要添加Adminer插件进行支持，我们把插件放在`~/mysql/adminer`目录下，同时在这个目录下我们新增一个`login-password-less.php`的的插件

```bash
vi ~/mysql/adminer/login-password-less.php
```

在文件中填入以下内容，然后保存，这样你就能通过`a123123.`作为密码，来访问不需要密码的数据库了

```php
<?php
require_once('plugins/login-password-less.php');

/** Set allowed password
 * @param string result of password_hash
 */
return new AdminerLoginPasswordLess(
 $password_hash = password_hash('a123123.', PASSWORD_DEFAULT)
);
```

处理好上面流程之后，再通过下面的 `docker-compose.yml` 文件拉取镜像

```yml
services:
  mysql:
    image: mysql:8.4.3
    container_name: my-app-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: a123123.
      TZ: Asia/Shanghai
    ports:
      - 33066:3306
    volumes:
      - ~/mysql/data:/var/lib/mysql
      - ~/mysql/my.cnf:/etc/my.cnf
      - ~/mysql/log/:/var/log/mysql
    command:
      - --mysql-native-password=on

  adminer:
    image: adminer
    container_name: my-app-adminer
    restart: always
    ports:
      - 58080:8080
    volumes:
      # 新建Sqlite目录并映射到容器内部，这样容器就能访问sqlite目录下的DB文件了
      - ~/sqlite:/sqlite/
      # 把插件目录映射到容器内部，让容器内部能够使用插件
      - ~/adminer:/var/www/html/plugins-enabled/

```

## MondoDB

```yml
services:
  my-app-mongo:
    image: mongo
    container_name: my-app-mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: <MONGODB_PASSWORD>
    ports:
      - 27017:27017

  my-app-mongo-express:
    image: mongo-express
    container_name: my-app-mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: <MONGO_EXPRESS_PASSWORD>
      ME_CONFIG_MONGODB_URL: mongodb://root:<MONGODB_PASSWORD>@mongo:27017/
      ME_CONFIG_BASICAUTH: false
```

## Redis

```yml
services:
  redis:
    image: redis:latest
    container_name: redis
    restart: always
    ports:
      - 6379:6379
    command: >
      sh -c '
      if [ -z "a123123." ]; then
        redis-server /etc/redis/redis.conf
      else
        redis-server /etc/redis/redis.conf --requirepass a123123.
      fi'
    volumes:
      - ~/redis/data:/data
      - ~/redis/redis.conf:/etc/redis/redis.conf
      - ~/redis/logs:/logs
```
