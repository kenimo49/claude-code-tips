# Tip 49: Use hooks to maintain state across sessions

> フックでセッション間の状態を維持する

**Category**: Hooks
**Related**: [Tip 36: Run tasks in background](./tip-36.md)

## Overview

Claude Codeのフック機能を使って、セッション間でコンテキストを維持できる。SessionStartフックで前回の状態を読み込み、PreCompactフックで状態を保存することで、継続的な作業が可能になる。

## Hook Types for State Management

| フック | タイミング | 用途 |
|--------|-----------|------|
| `SessionStart` | セッション開始時 | 前回のコンテキストを読み込む |
| `PreCompact` | コンテキスト圧縮前 | 重要な状態を保存する |
| `Stop` | セッション終了時 | 最終状態を保存する |

## Example Configuration

`.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat .claude/session-state.md 2>/dev/null || true"
          }
        ]
      }
    ],
    "PreCompact": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo '# Session State' > .claude/session-state.md && date >> .claude/session-state.md"
          }
        ]
      }
    ]
  }
}
```

## Memory Persistence Pattern

より高度な状態管理の例：

```bash
#!/bin/bash
# .claude/hooks/save-context.sh

# 現在の作業ディレクトリを保存
echo "working_dir: $(pwd)" > .claude/session-state.md

# 最近の変更ファイルを記録
echo "recent_files:" >> .claude/session-state.md
git diff --name-only HEAD~5 2>/dev/null >> .claude/session-state.md

# 未完了タスクがあればメモ
if [ -f .claude/todos.md ]; then
  echo "pending_todos:" >> .claude/session-state.md
  cat .claude/todos.md >> .claude/session-state.md
fi
```

## Why This Matters

- セッション再開時に前回の作業をすぐに継続できる
- コンテキスト圧縮時に重要な情報を失わない
- 長期プロジェクトでの作業効率が向上する

## See Also

- [Tip 36: Run tasks in background](./tip-36.md) - バックグラウンド実行
