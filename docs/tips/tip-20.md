# Tip 20: Use Notion to preserve links when pasting

> Notionを使ってリンクを保持して貼り付け

**Category**: Input
**Related**: [Tip 19: Markdown](./tip-19.md), [Tip 10: Cmd+A](./tip-10.md)

## Overview

[Tip 19](./tip-19.md) の逆パターン。リンク付きテキストをClaude Codeに渡す方法。

## The Problem

SlackなどからClaude Codeに直接貼り付けると、リンクが失われる。

## The Solution

1. 元のテキスト（Slackなど）をコピー
2. Notionドキュメントに貼り付け
3. Notionからコピー（Markdown形式になる）
4. Claude Codeに貼り付け

## Why This Works

NotionはリッチテキストをMarkdown形式で出力する。Claude CodeはMarkdownを正しく解釈できる。

## Use Cases

- Slackからのリンク付きメッセージ
- Webページの一部
- メールからの引用

## See Also

- [Tip 19: Markdown](./tip-19.md) - Markdownから他プラットフォームへ
- [Tip 10: Cmd+A](./tip-10.md) - コンテンツの取り込み
