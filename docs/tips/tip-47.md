# Tip 47: Fork sessions for parallel investigation

> セッションをフォークして並行調査する

**Category**: Workflow
**Related**: [Tip 16: Use git worktree](./tip-16.md), [Tip 55: Increase throughput with parallel instances](./tip-55.md)

## Overview

`--resume`でセッションを再開する際、`--fork-session`フラグを付けるとセッションを分岐できる。同じコンテキストを持った状態で複数の異なる調査を並行して進められる。

## Basic Usage

```bash
# セッションAの情報を元に、ウィンドウBで分岐（A-1を作成）
claude --resume A --fork-session

# 同じセッションAから、ウィンドウCでも分岐（A-2を作成）
claude --resume A --fork-session
```

## Fork vs Resume

| コマンド | 動作 |
|---------|------|
| `claude --resume A` | セッションAをそのまま継続（同一セッション） |
| `claude --resume A --fork-session` | セッションAから分岐した新しいセッションを作成 |

## Use Cases

例えば、あるプロジェクトの設計について話し合っていたセッションがあるとします。そこからフォークして：

- **分岐1**: フロントエンドの実装方法を調査
- **分岐2**: バックエンドのAPI設計を検討
- **分岐3**: テスト戦略を考える

それぞれが元のセッションのコンテキスト（プロジェクトの概要、制約条件など）を持った状態で、独立して進められる。

## With --continue

```bash
# 最後のセッションからフォーク
claude --continue --fork-session
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **コンテキストの再利用**: 同じ基盤情報を複数の調査で共有でき、重複した説明が不要
- **独立した探索**: 各フォークで異なる方向の調査を行っても、元のセッションに影響しない
- **効率的な比較**: 複数のアプローチを並行して試し、結果を比較できる

## Important Notes

- `--fork-session`を付けずに同じセッションを複数ウィンドウで`--resume`すると、メッセージが混在してしまう
- フォークしたセッションはセッションピッカーで元のセッションの下にグループ化されて表示される
- 完全なファイルレベルの分離が必要な場合は、Git worktreeの利用も検討

## Why This Matters

- 同じコンテキストから複数の調査を効率的に開始できる
- 調査結果を比較して最適な方針を選択できる
- セッションの履歴を整理して管理できる

## See Also

- [Tip 16: Use git worktree](./tip-16.md) - ファイルレベルの分離
- [Tip 55: Increase throughput with parallel instances](./tip-55.md) - 並列インスタンス
