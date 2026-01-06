# Tip 28: Mastering different ways of verifying its output

> 出力を検証する様々な方法をマスターする

**Category**: Verification
**Related**: [Tip 34: TDD](./tip-34.md), [Tip 26: PR reviews](./tip-26.md)

## Overview

Claude Codeの出力を検証する複数の方法がある。

## Methods

### 1. Tests

コードにはテストを書かせる。テスト自体も確認すること。

### 2. Claude Code UI

生成されたコードをリアルタイムでチェック。

### 3. Visual Git Client

GitHub Desktopなどで変更を視覚的に確認：
- 差分を色付きで表示
- 変更を素早くレビュー
- コミット前に確認

### 4. Draft PR

ドラフトPRを作成して確認：
- GitHub上で差分をレビュー
- コメントを追加
- 問題なければReady for Reviewに変更

### 5. Self-Check

Claude Codeに自己チェックさせる：

```
> 確かか？ダブルチェックして。

> すべての主張をダブルチェックして、最後に検証結果の表を作って。
```

人間の脳と同様、別の視点で見直すと問題を発見できることがある。

## Why This Matters

複数の検証方法を組み合わせることで、品質を確保できる。

## See Also

- [Tip 34: TDD](./tip-34.md) - テスト駆動開発
- [Tip 26: PR reviews](./tip-26.md) - PRレビュー
- [Tip 4: Git and GitHub CLI](./tip-04.md) - GitHub操作
