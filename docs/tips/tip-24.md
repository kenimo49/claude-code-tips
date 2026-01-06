# Tip 24: Use realpath to get absolute paths

> realpathで絶対パスを取得

**Category**: Basics
**Related**: [Tip 1: Slash commands](./tip-01.md)

## Overview

別のフォルダにあるファイルについてClaude Codeに伝えるとき、`realpath`で絶対パスを取得すると便利。

## Usage

```bash
realpath some/relative/path
```

出力例：
```
/home/user/projects/claude-code-tips/some/relative/path
```

## Why This Matters

- Claude Codeに正確なパスを伝えられる
- 相対パスの曖昧さを避ける
- 異なるディレクトリ間でファイルを参照

## Example

```bash
# 現在のディレクトリから相対パスを解決
realpath ../other-project/src/config.js

# Claude Codeに貼り付け
> /home/user/projects/other-project/src/config.js を確認して
```

## See Also

- [Tip 1: Slash commands](./tip-01.md) - 基本コマンド
