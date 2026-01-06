# Tip 4: Using Git and GitHub CLI like a pro

> GitとGitHub CLIをClaude Codeに任せて効率化

**Category**: Git
**Related**: [Tip 16: Git worktrees](./tip-16.md), [Tip 26: Interactive PR reviews](./tip-26.md)

## Overview

GitとGitHub CLI（`gh`）のタスクをClaude Codeに任せる。コミット、ブランチ作成、プッシュなどすべて対応可能。

## Recommended Settings

- **pull**: 自動許可（リスクが低い）
- **push**: 手動許可（リスクが高い）

## GitHub CLI Tips

### Draft PRs

ドラフトPRを作成させると安全：
- Claude Codeがタイトルと説明を作成
- レビュー前に内容を確認
- 問題なければready for reviewに変更

### GraphQL Queries

`gh`は任意のGraphQLクエリを実行可能：

```bash
gh api graphql -f query='
  query {
    repository(owner: "...", name: "...") {
      pullRequest(number: ...) {
        userContentEdits(first: 100) {
          nodes { editedAt editor { login } }
        }
      }
    }
  }'
```

PRの編集履歴など、Web UIでは見られない情報も取得できる。

## Common Tasks

- コミットメッセージの自動生成
- PRの作成・更新
- イシューの確認・作成
- CIの状態確認

## See Also

- [Tip 16: Git worktrees](./tip-16.md) - 並列ブランチ作業
- [Tip 26: Interactive PR reviews](./tip-26.md) - PRレビュー
- [Tip 29: DevOps workflows](./tip-29.md) - GitHub Actions調査
