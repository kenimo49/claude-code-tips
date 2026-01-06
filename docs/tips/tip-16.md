# Tip 16: Git worktrees for parallel branch work

> Git worktreeで並列ブランチ作業

**Category**: Git
**Related**: [Tip 4: Git and GitHub CLI](./tip-04.md), [Tip 14: Multitasking](./tip-14.md)

## Overview

複数のファイルやブランチで作業していてコンフリクトを避けたい場合、Git worktreeが便利。

## The Concept

ブランチ + ディレクトリの組み合わせ：
- 異なるブランチを異なるディレクトリで同時に作業
- 切り替え不要で並列作業が可能

## How to Use

Claude Codeに依頼するだけ：

```
> feature-xのためのgit worktreeを作成して、そこで作業を開始して
```

具体的な構文を覚える必要はない。

## Combining with Cascade Method

[Tip 14](./tip-14.md) のカスケードメソッドと組み合わせ：

```
[Tab 1: main branch]     [Tab 2: feature-a worktree]     [Tab 3: feature-b worktree]
```

各タブで異なるworktreeを開いて並列作業。

## Why This Matters

- ブランチ切り替えのオーバーヘッドがない
- 複数機能を同時に開発可能
- コンフリクトを避けながら作業

## See Also

- [Tip 4: Git and GitHub CLI](./tip-04.md) - Git操作全般
- [Tip 14: Multitasking](./tip-14.md) - ターミナルタブ管理
