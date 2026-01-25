# Tip 48: Model selection strategy - use Haiku/Sonnet/Opus wisely

> モデル選択戦略 - Haiku/Sonnet/Opus を使い分ける

**Category**: Performance
**Related**: [Tip 5: Compress context](./tip-05.md)

## Overview

Claude Codeでは3つのモデルを使い分けられる。タスクの複雑さに応じて適切なモデルを選択することで、コストを最適化しつつ品質を維持できる。

## Model Characteristics

| モデル | 用途 | 特徴 |
|--------|------|------|
| **Haiku** | 軽量タスク | 高速、低コスト。Sonnetの約3分の1のコスト |
| **Sonnet** | メイン開発 | バランス型。複雑なコード生成に適している |
| **Opus** | 複雑な設計判断 | 最高性能。深いリサーチ、アーキテクチャ設計に最適 |

## When to Use Each Model

### Haiku
- ファイル検索やパターンマッチング
- 簡単なリファクタリング
- 定型的なコード生成
- ドキュメントの軽微な修正

### Sonnet
- 日常的な開発作業
- 機能実装
- バグ修正
- テストコードの作成

### Opus
- システムアーキテクチャの設計
- 複雑な問題の調査・分析
- 複数の選択肢を比較検討する設計判断
- レガシーコードの大規模リファクタリング

## How to Switch Models

セッション中にモデルを切り替える：

```
/model opus
/model sonnet
/model haiku
```

設定ファイルでデフォルトを指定：

```json
{
  "model": "sonnet"
}
```

## Why This Matters

- コストを最大3倍削減できる
- タスクに適したモデルで品質を維持
- 複雑なタスクには十分なリソースを割り当てられる

## See Also

- [Tip 5: Compress context](./tip-05.md) - コンテキスト管理でコスト削減
