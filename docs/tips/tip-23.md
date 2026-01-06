# Tip 23: Clone and half-clone conversations

> 会話を複製・半複製する

**Category**: Context
**Related**: [Tip 5: Fresh context](./tip-05.md), [Tip 8: Proactive compaction](./tip-08.md)

## Overview

会話の特定のポイントから別のアプローチを試したい場合、会話を複製できる。

## Clone Conversation

[clone-conversation.sh](/scripts/clone-conversation.sh) で会話を完全複製：

- 新しいUUIDで複製
- 最初のメッセージに`[CLONED]`タグ
- `claude -r`リストと会話内で識別可能

### Setup

```bash
ln -s /path/to/repo/scripts/clone-conversation.sh ~/.claude/scripts/clone-conversation.sh
ln -s /path/to/repo/commands/clone.md ~/.claude/commands/clone.md
```

または [dx plugin](#install-the-dx-plugin) でインストール。

### Usage

会話内で `/clone`（または `/dx:clone`）を実行。

## Half-Clone Conversation

[half-clone-conversation.sh](/scripts/half-clone-conversation.sh) で後半のみ保持：

- コンテキストが長くなりすぎた時に便利
- 最近の作業を維持しつつトークン削減
- 最初のメッセージに`[HALF-CLONE]`タグ

### Setup

```bash
ln -s /path/to/repo/scripts/half-clone-conversation.sh ~/.claude/scripts/half-clone-conversation.sh
ln -s /path/to/repo/commands/half-clone.md ~/.claude/commands/half-clone.md
```

## See Also

- [scripts/clone-conversation.sh](/scripts/clone-conversation.sh)
- [scripts/half-clone-conversation.sh](/scripts/half-clone-conversation.sh)
- [Tip 5: Fresh context](./tip-05.md)
- [Tip 8: Proactive compaction](./tip-08.md)
