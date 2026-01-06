# Tip 32: It's all about choosing the right level of abstraction

> 適切な抽象レベルを選ぶことがすべて

**Category**: Workflow
**Related**: [Tip 3: Break down problems](./tip-03.md), [Tip 35: Iterative problem solving](./tip-35.md)

## Overview

Vibe codingレベルでOKな時もあれば、深く掘り下げる必要がある時もある。バイナリではなくスペクトラム。

## The Abstraction Spectrum

```
俯瞰 ←───────────────────────────────→ 詳細

[Vibe Coding] → [ファイル構造] → [関数] → [行] → [依存関係]
```

## When to Stay High-Level

- ワンタイムプロジェクト
- クリティカルでない部分
- プロトタイピング

## When to Go Deep

- プロダクションコード
- セキュリティ関連
- パフォーマンス重要な部分

## The Iceberg Metaphor

巨大な氷山を探索するように：

- **上空から**: Vibe codingレベル、遠くから確認
- **近づく**: ファイル構造を確認
- **潜水モード**: コードの詳細に入る
- **さらに深く**: 依存関係まで調査

Claude Codeがガイド役。

## Practical Application

エラーログをコピペして具体的な質問をする、コードの特定部分について質問する、など状況に応じてレベルを変える。

## See Also

- [Tip 3: Break down problems](./tip-03.md) - 問題の分解
- [Tip 35: Iterative problem solving](./tip-35.md) - 反復的解決
- [Tip 40: Simplify code](./tip-40.md) - コードの簡素化
