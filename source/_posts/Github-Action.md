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

#### easingthemes/ssh-deploy

> <https://github.com/easingthemes/ssh-deploy>

```yml
      # 通过SSH部署
      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          SOURCE: .
          REMOTE_HOST: ${{ secrets.SERVER_HOST }}
          REMOTE_USER: ${{ secrets.SERVER_USERNAME }}
          TARGET: /root/duuk/serve
          EXCLUDE: "/dist/, /node_modules/"
          SCRIPT_BEFORE: |
            whoami
            ls -al
          SCRIPT_AFTER: |
            whoami
            ls -al
```

#### appleboy/ssh-action

> <https://github.com/appleboy/ssh-action>

```yml
      # 通过SSH部署
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            whoami
            ls -al
```

```yml
      # 通过账号密码部署
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          script: |
            whoami
            ls -al
```

### Node JS

#### actions/setup-node

> <https://github.com/actions/setup-node>

#### pnpm/action-setup

> <https://github.com/pnpm/action-setup>
