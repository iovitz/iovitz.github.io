---
title: AI编程工具
author: 不锈钢盆
date: 2026-03-03 11:19:14
description:
categories:
  - AI
tags:
  - VibeCoding
---

## ClaudeCode

### ClaudeCode安装

[官方安装文档](https://code.claude.com/docs/zh-CN/quickstart)

### ClaudeCode配置

编辑或新增 `.claude.json` 文件，新增 `hasCompletedOnboarding` 参数，以跳过登录流程

* MacOS & Linux 为 `~/.claude.json`
* Windows 为`用户目录/.claude.json`

```json
{
  "hasCompletedOnboarding": true
}
```

安装 mcp

```bash
npm install -g typescript-language-server typescript
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```

安装 plugins

```bash
/plugin marketplace add anthropics/claude-code
/plugin install typescript-lsp
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
        "apiKey": "<MINIMAX_API_KEY>"
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

## PI

创建 `~/.pi/agent/models.json`，内容如下

```json
{
  "providers": {
    "Minimaxi": {
      "baseUrl": "https://api.minimaxi.com/v1",
      "api": "openai-completions",
      "apiKey": "<MINIMAX_API_KEY>",
      "models": [
        {
          "id": "MiniMax-M2.5",
          "name": "MiniMax-M2.5",
          "reasoning": false,
          "input": [
            "text"
          ],
          "contextWindow": 256000,
          "maxTokens": 64000,
          "cost": {
            "input": 0,
            "output": 0,
            "cacheRead": 0,
            "cacheWrite": 0
          }
        }
      ]
    }
  }
}
```

系统设置`code ~/.pi/agent/settings.json`

```json
{
  "lastChangelogVersion": "0.56.2",
  "defaultProvider": "Minimaxi",
  "defaultModel": "MiniMax-M2.5",
  "compaction": {
    "enabled": true,
    "reserveTokens": 16384,
    "keepRecentTokens": 20000
  },
  "retry": {
    "enabled": true,
    "maxRetries": 100,
    "baseDelayMs": 2000,
    "maxDelayMs": 2000
  }
}
```

## Crush

> [官方文档](https://github.com/charmbracelet/crush)

### Crush配置

* Unix: $HOME/.local/share/crush/crush.json
* Windows: %LOCALAPPDATA%\crush\crush.json

```json
{
  "$schema": "https://charm.land/crush.json",
  "lsp": {
    "typescript": {
      "command": "typescript-language-server",
      "args": [
        "--stdio"
      ]
    }
  },
  "mcp": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest"
      ]
    }
  },
  "providers": {
    "MiniMax": {
      "type": "openai-compat",
      "base_url": "https://api.minimaxi.com/anthropic/v1",
      "api_key": "<MINIMAX_API_KEY> (可选)",
      "models": [
        {
          "id": "deepseek-chat",
          "name": "Deepseek V3",
          "cost_per_1m_in": 0.27,
          "cost_per_1m_out": 1.1,
          "cost_per_1m_in_cached": 0.07,
          "cost_per_1m_out_cached": 1.1,
          "context_window": 64000,
          "default_max_tokens": 5000
        }
      ]
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
