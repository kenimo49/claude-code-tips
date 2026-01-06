# Tip 7: Set up terminal aliases for quick access

> ターミナルエイリアスで素早くアクセス

**Category**: Setup
**Related**: [Tip 0: Status line](./tip-00.md), [Tip 14: Multitasking](./tip-14.md)

## Overview

ターミナルを頻繁に使うようになるので、短いエイリアスを設定すると便利。

## Recommended Aliases

```bash
alias c='claude'           # 最も頻繁に使用
alias ch='claude --chrome' # Chrome統合付き
alias gb='github'          # GitHub Desktop
alias co='code'            # VS Code
alias q='cd ~/Desktop/projects'  # プロジェクトディレクトリへ
```

## Setup

`~/.zshrc` または `~/.bashrc` に追加：

```bash
alias c='claude'
alias ch='claude --chrome'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
```

## Usage Examples

```bash
c          # Claude Codeを起動
c -c       # 最後の会話を継続
c -r       # 最近の会話一覧から選択

ch         # Chrome統合付きで起動
ch -c      # Chrome統合 + 最後の会話を継続
```

## Why This Matters

- 毎日何度も使うコマンドは短い方が良い
- `c`だけでClaude Codeを起動できる
- プロジェクトディレクトリへの移動も一瞬

## See Also

- [Tip 14: Multitasking](./tip-14.md) - 複数タブでの作業
- [Tip 0: Status line](./tip-00.md) - ステータスラインのカスタマイズ
