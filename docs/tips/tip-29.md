# Tip 29: Claude Code as a DevOps engineer

> Claude CodeをDevOpsエンジニアとして使う

**Category**: DevOps
**Related**: [Tip 4: Git and GitHub CLI](./tip-04.md), [Tip 17: Exponential backoff](./tip-17.md)

## Overview

GitHub Actions CIの失敗調査に特に優れている。手動でログを読むのは苦痛だが、Claude Codeが大量のログを処理してくれる。

## The Workflow

```
> このGitHub Actionsの失敗を調査して。根本原因を探って。
```

表面的な回答の場合は深掘り：

```
> 特定のコミットが原因？特定のPR？それともフレーキーなテスト？
```

## The /gha Command

このワークフローを自動化する`/gha`コマンド：

```
> /gha <GitHub Actions URL>
```

機能：
- 失敗を調査
- フレーキーかどうかチェック
- 問題のコミットを特定
- 修正を提案

## After Investigation

問題を特定したら：
1. ドラフトPRを作成
2. 出力を確認
3. 自己検証させる
4. 問題なければ本PRに変換

## Why This Matters

- 大量のログを手動で読む必要がない
- 退屈なタスクをAIが処理
- 根本原因を効率的に特定

## See Also

- [commands/gha.md](/commands/gha.md) - `/gha`コマンド
- [Tip 4: Git and GitHub CLI](./tip-04.md) - GitHub CLI
- [Tip 17: Exponential backoff](./tip-17.md) - CI待機
