---
title: Git
description: Git学习笔记
author: 不锈钢盆
date: 2023-06-02 18:46:03
categories: 研发基建
tags:
  - Git
  - 研发基建
---

# Git 学习相关文档

**Git 的官方文档**

- [Git 官网](https://git-scm.com/)
- [Git 官方文档](https://git-scm.com/about)

**Git 的 GUI 工具**

- [Github Desktop](https://desktop.github.com/)
- [Sourcetree](https://www.sourcetreeapp.com/)

**Git 的一些其他资源**

- [Learn Git Branching](https://learngitbranching.js.org/)

# Git 仓库操作

克隆仓库

```shell
git clone <rep url>
```

设置远程仓库

```shell
git remote add origin git@github.com:iovitz/<repo name>.git
```

# Git 常用指令

暂存

```shell
git add .
```

提交

```shell
git commit -m "<commit message>"
```

回退

```shell
git reset --soft HEAD^
```

cherry-pick

```shell
git cherry-pick <hash>
```

fetch

```shell
git fetch
```
