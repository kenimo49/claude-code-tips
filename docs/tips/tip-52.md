# Tip 52: Integrate external tools with MCP servers

> MCP サーバーで外部ツールを統合する

**Category**: MCP
**Related**: [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md)

## Overview

Model Context Protocol (MCP) サーバーを使って、GitHub、Supabase、Vercel などの外部ツールをClaude Codeに統合できる。これにより、IDE を離れることなく様々なサービスを操作できる。

## Supported Integrations

| サービス | 機能 |
|----------|------|
| **GitHub** | Issue作成、PR管理、コードレビュー |
| **Supabase** | データベース操作、認証管理 |
| **Vercel** | デプロイ、環境変数管理 |
| **Slack** | メッセージ送信、通知 |
| **Linear** | タスク管理、Issue追跡 |

## Configuration

`.claude/settings.json` でMCPサーバーを設定：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

## Tool Limits

- 最大 **80ツール** まで有効化可能
- ツールが増えるとコンテキストウィンドウを消費
- 必要なツールのみ有効化することを推奨

## Monitor Context Usage

ツールの説明はコンテキストウィンドウを消費する。使用状況を監視：

```
/context
```

## Example: GitHub Integration

```
You: GitHub Issue #123 の内容を確認して

Claude: [MCP経由でGitHub APIを呼び出し]
Issue #123: "ログインページのバグ"
- 状態: Open
- 担当者: @developer
- 説明: ...
```

## Why This Matters

- 開発フローをClaude Code内で完結できる
- ツール切り替えのオーバーヘッドを削減
- 外部サービスの操作を自動化できる

## See Also

- [MCP公式ドキュメント](https://modelcontextprotocol.io/) - MCPの詳細
- [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md) - 拡張の種類
