---
title: MAC下常用软件安装
author: 不锈钢盆
date: 2024-03-20 20:04:29
description: MAC下常用软件安装
categories: 环境搭建
tags:
  - MAC
  - 环境搭建
---

# Homebrew

进入官网[https://brew.sh](https://sspai.com/link?target=https%3A%2F%2Fbrew.sh%2F)复制以下命令

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

国内用户可用 CDN 安装命令：

```
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/duzyn/homebrew-cn/install.sh)"
```

输入自己的密码，按 ENTER 继续

运行命令将 homebrew 添加到您的 PATH 中

```
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/<willshowyouruserdirectory>/.zprofile
```

继续运行

```
eval "$(/opt/homebrew/bin/brew shellenv)"
```

这时你就成功安装了 Homebrew
