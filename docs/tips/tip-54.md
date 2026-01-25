# Tip 54: Design verification loops

> 検証ループを設計する

**Category**: Quality
**Related**: [Tip 28: Let Claude verify its output](./tip-28.md), [Tip 34: Use TDD](./tip-34.md)

## Overview

コード生成の品質を高めるために、検証ループを設計する。チェックポイント方式と継続的評価を組み合わせることで、高品質な成果物を得られる。

## Verification Strategies

### 1. Checkpoint Verification

特定のポイントで品質をチェック：

```
実装 → ユニットテスト → 型チェック → リント → 次のステップ
```

### 2. Continuous Evaluation

各変更後に即時フィードバック：

```
変更 → 自動テスト実行 → エラーがあれば修正 → 繰り返し
```

## Pass@k Metrics

複数回の生成から最良の結果を選択：

| 指標 | 説明 |
|------|------|
| pass@1 | 1回の生成で正解する確率 |
| pass@5 | 5回の生成で1つ以上正解する確率 |
| pass@10 | 10回の生成で1つ以上正解する確率 |

## Verification Types

### Type Check
```bash
npx tsc --noEmit
```

### Unit Tests
```bash
npm test -- --coverage
```

### Lint
```bash
npm run lint
```

### Integration Test
```bash
npm run test:e2e
```

## Example Verification Loop in CLAUDE.md

```markdown
## Verification Process

コード変更後は以下の順序で検証：

1. **型チェック**: `npx tsc --noEmit`
2. **ユニットテスト**: `npm test`
3. **リント**: `npm run lint`
4. **ビルド**: `npm run build`

すべてパスするまで修正を続ける。
```

## Automated Verification with Hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run typecheck 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

## Why This Matters

- 早期にエラーを発見できる
- 手戻りを最小化できる
- 一貫した品質を維持できる

## See Also

- [Tip 28: Let Claude verify its output](./tip-28.md) - 出力の検証
- [Tip 34: Use TDD](./tip-34.md) - テスト駆動開発
