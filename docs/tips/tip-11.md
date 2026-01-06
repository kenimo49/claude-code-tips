# Tip 11: Use Gemini CLI as a fallback for blocked sites

> ブロックされたサイトにはGemini CLIをフォールバックとして使用

**Category**: Web
**Related**: [Tip 9: Write-test cycle](./tip-09.md), [Tip 21: Containers](./tip-21.md)

## Overview

Claude CodeのWebFetchツールはRedditなど一部のサイトにアクセスできない。Gemini CLIはWeb検索ができるので、スキルとして組み込んでフォールバックにできる。

## How It Works

tmuxパターンを使用：
1. tmuxセッションを開始
2. Gemini CLIにコマンドを送信
3. 出力をキャプチャ
4. Claude Codeに返す

## Setup

スキルファイルを配置：

```
~/.claude/skills/reddit-fetch/SKILL.md
```

詳細は [skills/reddit-fetch/SKILL.md](/skills/reddit-fetch/SKILL.md) を参照。

## Skills vs CLAUDE.md

- **Skills**: 必要な時だけロードされる（トークン効率が良い）
- **CLAUDE.md**: 常にロードされる

Gemini CLI連携はスキルとして実装する方が効率的。

## Requirements

- Gemini CLIがインストールされていること
- tmuxが使えること

## Use Case Example

「Claude CodeのスキルについてRedditでどう評価されているか調べて」

→ Gemini CLIがRedditを検索し、結果をClaude Codeに返す。

## See Also

- [Tip 9: Write-test cycle](./tip-09.md) - tmuxパターン
- [Tip 21: Containers](./tip-21.md) - 長時間リサーチ
- [skills/reddit-fetch/](/skills/reddit-fetch/) - スキル実装
