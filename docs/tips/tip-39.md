# Tip 39: Spend some time planning, but also prototype quickly

> 計画に時間をかけつつ、素早くプロトタイプも作る

**Category**: Workflow
**Related**: [Tip 3: Break down problems](./tip-03.md), [Tip 32: Abstraction levels](./tip-32.md)

## Overview

Claude Codeが何を・どう構築するか理解できるよう、十分な計画を立てる。ただし、プロトタイピングも計画の一部。

## High-Level Decisions Early

早い段階で決めるべきこと：
- 使用する技術
- プロジェクト構造
- 機能の配置場所
- ファイル構成

## Prototyping Helps Planning

シンプルなプロトタイプを素早く作ることで：

```
「この技術はこの目的に使える」
「こっちの技術の方が良さそう」
```

と判断できる。

## Real Example: Diff Viewer

diff viewerを実験：
1. tmux + lazygitでbashプロトタイプ
2. Ink + Nodeで独自gitビューアを試作
3. 様々な問題に遭遇
4. 結果は公開しなかったが、計画とプロトタイピングの重要性を再認識

## Plan Mode

Shift+Tabでプランモードに切り替え、またはClaude Codeに依頼：

```
> コードを書く前にまず計画を立てて
```

## Why This Matters

- コードを書かせる前に少し計画すると、より良いガイダンスができる
- プロセス全体を通じてガイダンスは必要だが、最初の計画が重要

## See Also

- [Tip 3: Break down problems](./tip-03.md) - 問題の分解
- [Tip 32: Abstraction levels](./tip-32.md) - 抽象レベルの選択
