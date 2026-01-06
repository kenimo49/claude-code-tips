# Tip 0: Customize your status line

> Claude Codeのステータスラインをカスタマイズして、モデル・ブランチ・トークン使用量などを表示する

**Category**: Setup
**Related**: [Tip 7: Terminal aliases](./tip-07.md), [Tip 8: Proactive compaction](./tip-08.md)

## Overview

Claude Codeのステータスラインをカスタマイズして、作業に必要な情報を常に表示できる。

表示例：
```
Opus 4.5 | 📁claude-code-tips | 🔀main (scripts/context-bar.sh uncommitted, synced 12m ago) | ██░░░░░░░░ 18% of 200k tokens
💬 This is good. I don't think we need to change the documentation...
```

## What It Shows

- モデル名（Opus 4.5など）
- 現在のディレクトリ
- Gitブランチ・未コミットファイル数・同期状態
- トークン使用量（プログレスバー）
- 最後のメッセージ（会話の文脈確認用）

## How to Use

1. `scripts/context-bar.sh` スクリプトを設定
2. 詳細は [scripts/README.md](/scripts/README.md) を参照

## Color Themes

10色のテーマから選択可能：
- orange, blue, teal, green, lavender
- rose, gold, slate, cyan, gray

![Color preview](../../scripts/color-preview.png)

## Why This Matters

- コンテキスト使用量を常に把握できる
- Gitの状態を一目で確認
- 複数タブで作業中も会話内容を識別しやすい

## See Also

- [scripts/context-bar.sh](/scripts/context-bar.sh) - ステータスラインスクリプト
- [scripts/README.md](/scripts/README.md) - セットアップ手順
