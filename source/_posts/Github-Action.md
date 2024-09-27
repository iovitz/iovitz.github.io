---
title: Github Action
author: 不锈钢盆
date: 2024-09-27 15:38:21
description:
categories: 前端基建
tags:
  - Git
  - 研发基建
---

## 基本语法

## 分支限制

## 好用的Action

### Checkout

#### action/checkout

> <https://github.com/actions/checkout>

### FTP

#### SamKirkland/FTP-Deploy-Action

> <https://github.com/SamKirkland/FTP-Deploy-Action>

使用示例：

```yml
      # 通过密码上传
      - name: Upload With FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: '${{ secrets.FTP_LOCAL_DIR }}'
          server-dir: '${{ secrets.FTP_SERVER_DIR }}'
```

#### appleboy/scp-action

> <https://github.com/appleboy/scp-action>

```yml
      # 通过密码上传
      - name: Upload With FTP
        uses: sebastianpopp/ftp-action@releases/v2
        with:
          host: ${{ secrets.FTP_SERVER }}
          user: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          localDir: '${{ secrets.FTP_LOCAL_DIR }}'
          remoteDir: '${{ secrets.FTP_SERVER_DIR }}'
```

### SSH

### Node JS

#### actions/setup-node

> <https://github.com/actions/setup-node>

#### pnpm/action-setup

> <https://github.com/pnpm/action-setup>
