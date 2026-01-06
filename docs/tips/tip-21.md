# Tip 21: Containers for long-running risky tasks

> 長時間でリスクのあるタスクにはコンテナを使用

**Category**: Container
**Related**: [Tip 9: Write-test cycle](./tip-09.md), [Tip 11: Gemini CLI](./tip-11.md)

## Overview

> `--dangerously-skip-permissions`は無防備な行為のようなもの。コンド...いや、コンテナを使おう。

通常セッション：慎重に権限を管理
コンテナセッション：`--dangerously-skip-permissions`で自律実行

## Use Cases

- 長時間のリサーチ
- 実験的なタスク
- リスクのある操作

## Example: System Prompt Patching

新バージョンのClaude Code向けにパッチを更新する際：
1. コンテナ内でClaude Codeを実行
2. minified JSを探索してパッチを作成
3. ホストマシンに影響なく実験

## Advanced: Worker Claude Code

ローカルClaude Codeがコンテナ内のClaude Codeを制御：

1. tmuxセッションを開始
2. コンテナに接続
3. コンテナ内で`--dangerously-skip-permissions`でClaude Code実行
4. `tmux send-keys`と`capture-pane`で制御

## Advanced: Multi-Model Orchestration

異なるAI CLIをコンテナで実行：
- Codex（コードレビュー用）
- Gemini CLI（Web検索用）
- Claude Codeが中央インターフェースとして調整

## Setup

[container/](/container/) にDockerfile とセットアップ手順あり。

## See Also

- [container/](/container/) - Docker環境
- [Tip 9: Write-test cycle](./tip-09.md) - tmuxパターン
- [Tip 11: Gemini CLI](./tip-11.md) - Gemini連携
