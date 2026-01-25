# Tip 56: Avoid the last 20% of context window

> コンテキストウィンドウの最後の20%を避ける

**Category**: Performance
**Related**: [Tip 5: Compress context](./tip-05.md), [Tip 8: Compact proactively](./tip-08.md)

## Overview

コンテキストウィンドウの80%を超えると、Claude Code の効率が低下する。大規模な作業では早めに `/compact` を実行し、コンテキストを管理することが重要。

## Why Performance Degrades

コンテキストが満杯に近づくと：

- **注意力の分散**: 重要な情報が埋もれる
- **応答品質の低下**: 関連性の低い情報に影響される
- **強制圧縮のリスク**: 自動圧縮で重要な情報が失われる可能性

## When to Compact

| 作業タイプ | 推奨タイミング |
|-----------|---------------|
| 複数ファイルのリファクタリング | 70%到達時 |
| 新機能実装 | 60%到達時 |
| デバッグセッション | 50%到達時（試行錯誤が多い） |

## Check Context Usage

```
/context
```

コンテキスト使用率を確認し、80%に近づいたら圧縮を検討。

## Agent Selection by Task Size

作業サイズに応じてモデル/アプローチを選択：

| タスクサイズ | アプローチ |
|-------------|-----------|
| 小（1-2ファイル） | そのまま継続 |
| 中（3-5ファイル） | 完了ごとに `/compact` |
| 大（6ファイル以上） | タスク分割 + 新セッション |

## Proactive Compaction Strategy

```markdown
## CLAUDE.md に追加

### Context Management
- 大規模変更の前に `/compact` を実行
- 1つのタスク完了ごとに状態を確認
- 複数ファイル編集時は段階的にコミット
```

## Signs You Need to Compact

- 応答が遅くなった
- 以前の指示を忘れている様子
- 同じ質問を繰り返してくる
- ファイル内容を正確に参照できていない

## Why This Matters

- 応答品質を維持できる
- 重要な情報を保持できる
- 作業効率が向上する

## See Also

- [Tip 5: Compress context](./tip-05.md) - コンテキスト圧縮の基本
- [Tip 8: Compact proactively](./tip-08.md) - 積極的な圧縮
