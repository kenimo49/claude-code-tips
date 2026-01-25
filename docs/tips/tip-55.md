# Tip 55: Increase throughput with parallel instances

> 並列インスタンスでスループットを上げる

**Category**: Workflow
**Related**: [Tip 16: Use git worktree](./tip-16.md), [Tip 36: Run tasks in background](./tip-36.md)

## Overview

Git worktree と複数の Claude Code インスタンスを組み合わせることで、並列処理によるスループット向上が可能。独立したタスクを同時に進められる。

## Setup with Git Worktree

```bash
# メインブランチ
cd ~/project

# 機能Aの作業用worktree
git worktree add ../project-feature-a feature-a

# 機能Bの作業用worktree
git worktree add ../project-feature-b feature-b
```

## Parallel Instances

各 worktree で別々の Claude Code インスタンスを起動：

```bash
# ターミナル1
cd ~/project-feature-a && claude

# ターミナル2
cd ~/project-feature-b && claude

# ターミナル3
cd ~/project && claude  # メインブランチでレビュー
```

## Cascade Pattern

依存関係のあるタスクを連鎖的に処理：

```
Instance 1: API設計 → 完了
    ↓
Instance 2: バックエンド実装 → 完了
    ↓
Instance 3: フロントエンド実装
```

## Instance Scaling Guidelines

| タスクタイプ | 推奨インスタンス数 |
|-------------|-------------------|
| 独立した機能開発 | 2-3 |
| バグ修正 + 新機能 | 2 |
| リファクタリング | 1（競合を避ける） |
| コードレビュー | 1（専用インスタンス） |

## Coordination Tips

1. **明確なスコープ分離**: 各インスタンスが異なるファイル/モジュールを担当
2. **定期的な同期**: `git pull --rebase` で変更を取り込む
3. **競合回避**: 同じファイルを複数インスタンスで編集しない

## Example Workflow

```
# 朝: タスク分割
Instance 1: 認証モジュール実装
Instance 2: データベースマイグレーション
Instance 3: ユニットテスト作成

# 昼: 統合
git merge feature-auth
git merge feature-db
git merge feature-tests

# 午後: 統合テストと修正
Instance 1: E2Eテスト
```

## Why This Matters

- 開発スループットが2-3倍に向上
- 待ち時間を有効活用できる
- 大規模タスクを効率的に分解できる

## See Also

- [Tip 16: Use git worktree](./tip-16.md) - Git worktree の詳細
- [Tip 36: Run tasks in background](./tip-36.md) - バックグラウンド実行
