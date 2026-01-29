# Tip 59: Let Claude Read Windows Screenshots from WSL2

> WindowsのスクショをWSL2のClaude Codeで直接確認する

**Category**: Workflow
**Related**: [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md), [Tip 44: Leverage hierarchical CLAUDE.md loading](./tip-44.md)

## Overview

WSL2でClaude Codeを使っていると、Windows側で撮ったスクリーンショットを見せたい場面がある。WSL2からはWindowsのファイルシステムに `/mnt/c/` でアクセスできるので、CLAUDE.mdに一行書くだけで「スクショ確認して」だけでClaude Codeが最新のスクリーンショットを読み取れるようになる。

## Setup

`~/.claude/CLAUDE.md`（ユーザーレベル設定）に以下を追加する：

```markdown
- Screenshots: when user mentions スクショ/screenshot, find the latest file in `/mnt/c/Users/<ユーザー名>/Pictures/Screenshots/` and read it with the Read tool
```

パスは自分の環境に合わせて変更する。OneDriveを使っている場合：

```
/mnt/c/Users/<ユーザー名>/OneDrive/Pictures/Screenshots/
```

## Why ~/.claude/CLAUDE.md?

- **全プロジェクトで有効** - プロジェクトごとに設定不要
- **パブリックリポジトリに含まれない** - ローカルパスがGitに入る心配がない
- **個人設定として管理しやすい** - Windowsのユーザー名やフォルダ構成は人それぞれ

## Usage

Windows側で `PrtScn` キーなどでスクショを撮った後、Claude Codeに：

```
スクショ確認して
```

これだけでClaude Codeが以下を自動で行う：

1. スクリーンショットフォルダの最新ファイルを特定
2. Readツールで画像を読み込み
3. 内容を見て回答

## How It Works

```
Windows (PrtScn)
  └── C:\Users\...\Pictures\Screenshots\スクリーンショット 2026-01-28 005803.png
        │
        │  /mnt/c/ マウント
        ▼
WSL2: /mnt/c/Users/.../Pictures/Screenshots/
        │
        │  CLAUDE.md の指示に従って
        ▼
Claude Code: ls -lt → Read tool → 画像を認識
```

## Screenshot Save Location

Windowsのスクリーンショット保存先はキーの種類によって異なる：

| キー | 保存先 |
|------|--------|
| `PrtScn` | クリップボード（設定によりフォルダ保存可能） |
| `Win+PrtScn` | `Pictures\Screenshots` に自動保存 |
| `Win+Shift+S` | クリップボード（通知から保存可能） |

**設定 > アクセシビリティ > キーボード** で `PrtScn` キーの動作を変更できる。「Print Screenキーを使用してSnipping Toolを開く」をオフにすると、`PrtScn` で直接 `Pictures\Screenshots` に保存される場合がある。

## Why This Matters

- **手間ゼロ** - スクショを撮って「確認して」と言うだけ
- **ファイルパスの入力不要** - 日本語ファイル名やスペース入りパスを手打ちしなくていい
- **マルチモーダル活用** - Claude Codeは画像を直接認識できるので、UIの確認やエラー画面の共有に便利

## See Also

- [Tip 44: Leverage hierarchical CLAUDE.md loading](./tip-44.md) - CLAUDE.mdの階層構造
- [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md) - WSL2でのブラウザ自動化
