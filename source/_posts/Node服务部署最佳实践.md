---
title: Node服务部署最佳实践
author: 不锈钢盆
date: 2025-02-26 11:12:11
description: Node项目部署的最佳实践
categories: NodeJS
tags:
  - NodeJS
  - 工程化
  - 研发基建
---

## 环境准备

### 安装常用软件

#### 软件升级

```bash
apt update
```

#### 安装一些常用的小软件

* curl: 有一些软件，用 `curl` 安装会很方便
* vim/neovim: 比 `vi` 更好用的编辑器
* ufw：防火墙软件

```bash
apt install curl vim ufw
```

安装完 `ufw` 之后，需要开启防火墙，同时开放常用端口

```bash
ufw enable && sudo ufw allow 21,22,23,80,443/tcp
```

这里列一些其他的常见的 `ufw` 指令

```bash
# 重启防火墙
sudo ufw reload
# 查看端口规则
sudo ufw status
#开放指定端口（开放80端口，需重启防火墙生效）
sudo ufw allow 80/tcp
```

安装完 `vim` 后需要编辑 `~/.vimrc` 文件，添加下面的内容，这是我自己常用的一些配置

```vimrc
set autoread
filetype plugin on
set clipboard=unnamed
set nobackup
set autowrite
set ruler
set cursorline
set magic
set guioptions-=T
set guioptions-=m
set nocompatible
set syntax=on
set noeb
set confirm
set autoindent
set cindent
set tabstop=2
set softtabstop=2
set shiftwidth=2
set expandtab
set smarttab
set smartindent
set number
set history=1000
set nobackup
set noswapfile
set ignorecase
set hlsearch
set incsearch
set gdefault
set enc=utf-8
set fencs=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
set langmenu=zh_CN.UTF-8
set helplang=cn
set laststatus=2
set cmdheight=2
filetype on
filetype plugin on
filetype indent on
set viminfo+=!
set iskeyword+=_,$,@,%,#,-
set linespace=0
set wildmenu
set backspace=2
set whichwrap+=<,>,h,l
set report=0
set showmatch
set matchtime=1
set scrolloff=3
```

### 安装NodeJS

#### [推荐]使用apt-get安装Node

添加 [NodeSource](https://deb.nodesource.com/) 的仓库来安装特定版本

```bash
curl -fsSL <https://deb.nodesource.com/setup_20.x> | sudo bash -
```

展示所有可用的nodejs版本

```bash
apt-cache showpkg nodejs
```

安装指定版本的nodejs版本，这里以 `nodejs@20.18.0` 版本为例

```bash
sudo apt-get install -y nodejs=20.18.0-1nodesource1
```

#### 使用NVM安装Node

前往 [NVM的官网](https://github.com/nvm-sh/nvm) 找到安装指令，在控制台执行

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# OR
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

安装完成之后需要执行一下 `source ~/.bashrc` 更新一下环境，否则控制台可能找不到nvm命令

```bash
source ~/.bashrc
```

在安装完nvm之后，控制台执行 `nvm install x.x.x` 以安装指定Node版本

```bash
nvm install 20.18.0
```

#### 安装常用库

安装完Nodejs之后需要安装常用的一些全局依赖，同时设置好npm源，首先安装 `nrm`，直接安装可能会失败（被墙），所以安装的时候指定一下使用淘宝源

```bash
# 普通安装
npm install nrm -g

# 如果在国内被墙了，就使用淘宝源安装nrm
npm --registry https://registry.npmmirror.com install nrm -g
```

国内机器可以使用淘宝源，国外机器可以使用默认的npm源

```bash
nrm use taobao
```

配置好registry之后，可以继续安装其他常用npm包了

```bash
npm install pnpm pm2 yarn live-server nodemon -g

# 设置pnpm
pnpm setup && source ~/.bashrc
```

### 新建用户

为每个部署的服务都新增一个单独的user

```bash
user add <username> -m && passwd <username>
```
