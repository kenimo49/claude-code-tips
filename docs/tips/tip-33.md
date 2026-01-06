# Tip 33: Audit your approved commands

> 許可したコマンドを監査する

**Category**: Security
**Related**: [Tip 21: Containers](./tip-21.md)

## Overview

ある人がClaude Codeで `rm -rf tests/ patches/ plan/ ~/` を許可してホームディレクトリを削除した事例がある。誰にでも起こりうる。許可したコマンドを定期的に監査すべき。

## cc-safe Tool

リスクのある許可コマンドをスキャンするCLI：

```bash
npm install -g cc-safe
cc-safe ~/projects
```

または直接実行：

```bash
npx cc-safe .
```

## What It Detects

- `sudo`, `rm -rf`, `Bash`, `chmod 777`, `curl | sh`
- `git reset --hard`, `npm publish`, `docker run --privileged`
- その他多数

コンテナ対応：`docker exec`内のコマンドはスキップ。

## How It Works

`.claude/settings.json`ファイルを再帰的にスキャン。プロジェクトフォルダを指定すると一括チェック可能。

## Why This Matters

- Vibe codingでも重大なミスは避けたい
- 定期的な監査で安全性を確保
- Claude Codeに実行させることも可能

## See Also

- [cc-safe on GitHub](https://github.com/ykdojo/cc-safe)
- [Tip 21: Containers](./tip-21.md) - リスクのあるタスクはコンテナで
