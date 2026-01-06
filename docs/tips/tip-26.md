# Tip 26: Interactive PR reviews

> インタラクティブなPRレビュー

**Category**: Git
**Related**: [Tip 4: Git and GitHub CLI](./tip-04.md), [Tip 28: Verifying output](./tip-28.md)

## Overview

Claude CodeはPRレビューに最適。`gh`コマンドでPR情報を取得し、対話的にレビューを進められる。

## The Workflow

1. PR情報を取得させる
2. レビュー方法を選択：
   - 一般的なレビュー
   - ファイルごと・ステップごと
   - テストの実行まで含める

## Key Difference

他のAIツールは一発レビュー（ワンショット）が得意だが、Claude Codeは**対話的**にレビューできる。

## Control Your Pace

- ペースを自分で制御
- 詳細度を調整
- 複雑さのレベルを選択
- 全体構造だけ見るか、テストまで実行するか

## Example Session

```
> gh pr view 123 の内容を取得して

> まず全体構造を説明して

> src/auth.ts の変更を詳しく見て

> セキュリティ上の懸念はある？

> テストを実行して結果を確認して
```

## See Also

- [Tip 4: Git and GitHub CLI](./tip-04.md) - GitHub CLI基本
- [Tip 28: Verifying output](./tip-28.md) - 出力の検証
- [Tip 29: DevOps](./tip-29.md) - CI/CD調査
