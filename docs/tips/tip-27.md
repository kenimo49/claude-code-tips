# Tip 27: Claude Code as a research tool

> Claude Codeをリサーチツールとして使う

**Category**: Research
**Related**: [Tip 10: Cmd+A](./tip-10.md), [Tip 11: Gemini CLI](./tip-11.md)

## Overview

Claude Codeはあらゆるリサーチに対応できる。Google検索やDeep Researchの代替、あるいはそれ以上。

## Research Types

- **GitHub Actions調査**: なぜCIが失敗したか
- **Reddit分析**: 市場調査・センチメント分析
- **コードベース探索**: 既存コードの理解
- **公開情報検索**: 様々な情報収集

## Key: Providing Access

適切な情報とアクセス方法を与える：

| 情報源 | アクセス方法 |
|--------|-------------|
| GitHub | `gh`コマンド |
| Reddit | Gemini CLI（[Tip 11](./tip-11.md)） |
| Slack | Slack MCP |
| プライベートページ | Cmd+A（[Tip 10](./tip-10.md)） |
| ブロックされたURL | Playwright MCP / Chrome統合 |

## Real Example

Claude Codeを使ったリサーチで$10,000節約した事例あり。

→ [content/how-i-saved-10k-with-claude-code.md](/content/how-i-saved-10k-with-claude-code.md)

## See Also

- [Tip 10: Cmd+A](./tip-10.md) - コンテンツ取り込み
- [Tip 11: Gemini CLI](./tip-11.md) - ブロックサイトへのアクセス
- [Tip 29: DevOps](./tip-29.md) - GitHub Actions調査
