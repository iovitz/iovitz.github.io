---
title: AI编程工具
author: 不锈钢盆
date: 2026-03-03 11:19:14
description:
categories:
tags:
---

## ClaudeCode

### ClaudeCode安装

[官方安装文档](https://code.claude.com/docs/zh-CN/quickstart)

### ClaudeCode配置

Step1: 跳过 Claude Code 的登录流程，编辑或新增 `.claude.json` 文件，新增 `hasCompletedOnboarding` 参数

* MacOS & Linux 为 `~/.claude.json`
* Windows 为`用户目录/.claude.json`

```json
{
  "hasCompletedOnboarding": true
}
```

编辑或创建 Claude Code 的配置文件，添加模型配置

* MacOS & Linux 为 `~/.claude/settings.json`
* Windows 为`用户目录/.claude/settings.json`

> 环境变量 `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL` 优先级高于配置文件

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "MINIMAX_API_KEY",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_SMALL_FAST_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.5"
  }
}
```

## OpenCode

### OpenCode安装

> [官方安装文档](https://opencode.ai/)

### OpenCode配置

> [官方配置文档](https://opencode.ai/docs/zh-cn/config/)

* 全局配置: ~/.config/opencode/opencode.json
* 项目配置: 项目中的 opencode.json

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "minimax": {
      "npm": "@ai-sdk/anthropic",
      "options": {
        "baseURL": "https://api.minimaxi.com/anthropic/v1",
        "apiKey": "<MINIMAX_API_KEY> (可选)"
      },
      "models": {
        "MiniMax-M2.5": {
          "name": "MiniMax-M2.5"
        }
      }
    }
  }
}
```

## Droid

> [官方安装文档](https://factory.ai/product/cli)

### Droid配置

> [官方配置文档](https://docs.factory.ai/cli/configuration/settings)

* 全局配置：~/.factory/settings.json

```json
{
  "custom_models": [
    {
      "model_display_name": "MiniMax-M2.5",
      "model": "MiniMax-M2.5",
      "base_url": "https://api.minimaxi.com/anthropic",
      "api_key": "<MINIMAX_API_KEY>",
      "provider": "anthropic",
      "max_tokens": 64000
    }
  ]
}
```
