# Tip 36: Running bash commands and agents in the background

> Bashコマンドとエージェントをバックグラウンドで実行

**Category**: Automation
**Related**: [Tip 17: Exponential backoff](./tip-17.md), [Tip 14: Multitasking](./tip-14.md)

## Overview

長時間実行されるBashコマンドはCtrl+Bでバックグラウンドに移動できる。

## Background Bash Commands

コマンドが予想より長くかかっている場合：

1. **Ctrl+B** を押す
2. コマンドがバックグラウンドに移動
3. Claude CodeはBashOutputツールで後から確認可能
4. その間、他の作業を続けられる

## Background Agents

サブエージェントもバックグラウンドで実行可能：

```
> このリサーチをバックグラウンドで実行して
```

長時間のリサーチや定期的なチェックに便利。

## Use Cases

- 長時間のビルド
- 大量のファイル処理
- 長時間のリサーチ
- 定期的な状態チェック

## Combining with Other Tips

- [Tip 17](./tip-17.md) のエクスポネンシャルバックオフと組み合わせ
- [Tip 14](./tip-14.md) のマルチタスクと組み合わせ

## See Also

- [Tip 17: Exponential backoff](./tip-17.md) - 長時間ジョブの監視
- [Tip 14: Multitasking](./tip-14.md) - ターミナルタブ管理
