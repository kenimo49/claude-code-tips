# Tip 38: Navigating and editing your input box

> 入力ボックスのナビゲーションと編集

**Category**: Input
**Related**: [Tip 2: Voice input](./tip-02.md), [Tip 10: Cmd+A](./tip-10.md)

## Overview

Claude Codeの入力ボックスは一般的なターミナル/readlineショートカットをエミュレート。

## Navigation

| ショートカット | 動作 |
|---------------|------|
| `Ctrl+A` | 行頭にジャンプ |
| `Ctrl+E` | 行末にジャンプ |
| `Option+Left/Right` (Mac) | 単語単位で移動 |
| `Alt+Left/Right` (その他) | 単語単位で移動 |

## Editing

| ショートカット | 動作 |
|---------------|------|
| `Ctrl+W` | 前の単語を削除 |
| `Ctrl+U` | カーソルから行頭まで削除 |
| `Ctrl+K` | カーソルから行末まで削除 |
| `Ctrl+C` / `Ctrl+L` | 入力をクリア |
| `Ctrl+G` | 外部エディタで開く |

## External Editor (Ctrl+G)

長いテキストの貼り付けに便利（ターミナルへの直接貼り付けは遅い）。

エディタの設定：

```bash
# ~/.zshrc or ~/.bashrc
export EDITOR=vim  # or nano, code, nvim, etc.
```

または `~/.claude/settings.json`:

```json
{
  "env": {
    "EDITOR": "vim"
  }
}
```

## Multi-line Input

改行を入力する方法：
- `\` + Enter（どこでも動作）
- `/terminal-setup`を実行してキーボードショートカットを設定

## Pasting Images

- Mac/Linux: `Ctrl+V`（`Cmd+V`ではない）
- Windows: `Alt+V`

## See Also

- [Tip 2: Voice input](./tip-02.md) - 音声入力
- [Tip 10: Cmd+A](./tip-10.md) - 全選択
