# Tip 13: Search through your conversation history

> 会話履歴を検索する

**Category**: History
**Related**: [Tip 23: Clone conversations](./tip-23.md)

## Overview

過去の会話についてClaude Codeに尋ねると、検索してくれる。すべての会話履歴は`~/.claude/`にローカル保存されている。

## Storage Location

プロジェクト固有の会話：

```
~/.claude/projects/-Users-yk-Desktop-projects-claude-code-tips/
```

パス内のスラッシュはダッシュに変換される。各会話は`.jsonl`ファイル。

## Search Commands

```bash
# "Reddit"を含む会話を検索
grep -l -i "reddit" ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl

# 今日のキーワードを含む会話
find ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl \
  -mtime 0 -exec grep -l -i "keyword" {} \;

# ユーザーメッセージのみ抽出（jq必要）
cat conversation.jsonl | jq -r 'select(.type=="user") | .message.content'
```

## Ask Claude Code

直接聞くだけでも良い：

```
> 今日Xについて何を話したっけ？
```

Claude Codeが履歴を検索してくれる。

## See Also

- [Tip 23: Clone conversations](./tip-23.md) - 会話の複製
