# Tip 1: Learn a few essential slash commands

> よく使うスラッシュコマンドを覚えて、Claude Codeを効率的に操作する

**Category**: Basics
**Related**: [Tip 25: CLAUDE.md vs Skills vs Commands](./tip-25.md)

## Overview

Claude Codeにはビルトインのスラッシュコマンドが多数ある。`/` を入力すると一覧表示される。以下は特に便利なもの。

## Essential Commands

### /usage

レート制限の確認：

```
 Current session
 ███████                                            14% used
 Resets 3:59pm (Asia/Tokyo)

 Current week (all models)
 █████████████                                      26% used
 Resets Jan 3, 2026, 5:59am (Asia/Tokyo)
```

### /chrome

ネイティブブラウザ統合のトグル：

```
> /chrome
Chrome integration enabled
```

### /mcp

MCP（Model Context Protocol）サーバーの管理：

```
 Manage MCP servers
 1 server

 ❯ 1. playwright  ✔ connected · Enter to view details
```

### /stats

GitHub風アクティビティグラフで使用統計を表示：

```
      Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
      ·············································▒▒▒▓▒░█
  Mon ··············································▒█░▓░█
      ...

  Favorite model: Opus 4.5        Total tokens: 12.1m
  Sessions: 1.8k                  Longest session: 20h 40m 45s
```

### /clear

会話をクリアして新規開始。

### /compact

会話を要約してコンテキストを節約（[Tip 8](./tip-08.md) 参照）。

### /context

現在のコンテキスト使用量を詳細表示。

## Tips

- `/` を入力して一覧を確認
- `/release-notes` で新機能をチェック
- `/help` でヘルプを表示

## See Also

- [Tip 8: Proactive compaction](./tip-08.md) - `/compact` の活用
- [Tip 25: Understanding commands](./tip-25.md) - コマンドとスキルの違い
