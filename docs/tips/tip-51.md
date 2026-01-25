# Tip 51: Use /learn for continuous learning

> /learn で継続的に学習する

**Category**: Learning
**Related**: [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md)

## Overview

`/learn` コマンドを使うと、現在のセッションから有用なパターンを抽出し、将来のプロジェクトで再利用可能なスキルとして保存できる。

## How It Works

1. セッション中に有効だったアプローチを特定
2. `/learn` でそのパターンをスキルとして保存
3. 将来のセッションで自動的に活用

## Usage

```
/learn
```

Claudeがセッションを分析し、学習すべきパターンを提案する。

## What Gets Learned

- プロジェクト固有のコーディングパターン
- エラー解決のアプローチ
- テスト戦略
- ビルド・デプロイ手順

## Example Session

```
You: このプロジェクトではzustandを使ってる

Claude: 了解しました。zustandでの状態管理を行います。

... 作業完了後 ...

You: /learn

Claude: 以下のパターンを学習しました：
- このプロジェクトはzustandで状態管理
- ストアは /src/stores/ に配置
- createSelectors パターンを使用
```

## Where Learnings Are Stored

学習した内容は以下に保存される：

- `~/.claude/CLAUDE.md` - グローバルな学習
- `.claude/CLAUDE.md` - プロジェクト固有の学習

## Why This Matters

- 同じ説明を繰り返す必要がなくなる
- プロジェクト固有の知識が蓄積される
- チーム間での知識共有が容易になる

## See Also

- [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md) - 設定の使い分け
- [Tip 44: Leverage CLAUDE.md hierarchical loading](./tip-44.md) - CLAUDE.mdの階層構造
