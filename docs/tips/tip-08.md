# Tip 8: Proactively compact your context

> 積極的にコンテキストを圧縮する

**Category**: Context
**Related**: [Tip 5: Fresh context](./tip-05.md), [Tip 23: Clone conversations](./tip-23.md)

## Overview

`/compact`コマンドで会話を要約してコンテキストを節約できる。自動コンパクションもあるが、手動で調整した方が効果的。

## Context Window

Opus 4.5のコンテキストウィンドウ：
- 総容量: 200k トークン
- 自動コンパクション用: 45k トークン
- システムプロンプト等: 約10%

## Manual Compaction with Handoff

自動コンパクションをオフにして、手動で引き継ぎドキュメントを作成：

```
> 残りの計画をHANDOFF.mdに書いて。試したこと、うまくいったこと、
> うまくいかなかったことを説明して、次のエージェントがそのファイル
> だけで作業を続けられるようにして。
```

生成されるファイル例：

```markdown
# System Prompt Slimming - Handoff Document

## Goal
Reduce Claude Code's system prompt by ~45%

## Current Progress
### What's Been Done
- Backup/restore system created
- Patch system implemented
...
```

## Starting Fresh

新しい会話では、ファイルパスを渡すだけで作業を継続：

```
> experiments/system-prompt-extraction/HANDOFF.md
```

## The /handoff Command

このワークフローを自動化する`/handoff`コマンドを用意：
- 既存のHANDOFF.mdをチェック
- 目標・進捗・次のステップを記録

## See Also

- [Tip 5: Fresh context](./tip-05.md) - 新鮮なコンテキストの重要性
- [Tip 23: Clone conversations](./tip-23.md) - 会話の複製
- [commands/handoff.md](/commands/handoff.md) - handoffコマンド
