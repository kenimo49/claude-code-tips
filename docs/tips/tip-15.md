# Tip 15: Slim down the system prompt

> システムプロンプトをスリム化する

**Category**: Optimization
**Related**: [Tip 5: Fresh context](./tip-05.md), [Tip 8: Proactive compaction](./tip-08.md)

## Overview

Claude Codeのシステムプロンプトとツール定義は約20kトークン（全体の10%）を占める。パッチシステムで約9kトークンに削減可能（約55%削減）。

## Before/After

| コンポーネント | 前 | 後 | 削減 |
|---------------|-----|-----|------|
| システムプロンプト | 3.1k | 1.8k | 1,300 |
| システムツール | 15.6k | 7.1k | 8,500 |
| 許可ツールリスト | ~1k | 0 | ~1k |
| **合計** | **~20k** | **~9k** | **~11k (55%)** |

## /context Comparison

**パッチ前 (~20k, 10%)**
![Unpatched](/assets/context-unpatched.png)

**パッチ後 (~9k, 4%)**
![Patched](/assets/context-patched.png)

## How It Works

冗長な例文や重複テキストを削除しつつ、重要な指示は保持。

## Requirements

- npm インストール必須: `npm install -g @anthropic-ai/claude-code`
- 自動更新を無効化: `export DISABLE_AUTOUPDATER=1` を `~/.zshenv` に追加

## Experience

- より「生の」感覚 - パワフルだがやや規制が少ない
- プロ向けツールとしての使用感
- 会話を長く続けられる余地が増える

## See Also

- [system-prompt/](/system-prompt/) - パッチスクリプトと詳細
- [system-prompt/UPGRADING.md](/system-prompt/UPGRADING.md) - アップグレード手順
- [Tip 5: Fresh context](./tip-05.md) - コンテキスト管理
