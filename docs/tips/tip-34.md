# Tip 34: Write lots of tests (and use TDD)

> たくさんテストを書く（TDDを使う）

**Category**: Testing
**Related**: [Tip 9: Write-test cycle](./tip-09.md), [Tip 28: Verifying output](./tip-28.md)

## Overview

Claude Codeでコードを書くほど、ミスが起こりやすくなる。テストを書くことが重要。

## AI Can Test Its Own Work

「AIは自分の仕事をテストできない」と言う人がいるが、実際はできる。

人間の脳と同じ：テストを書く時、同じ問題を違う視点で考える。AIも同様。

## TDD with Claude Code

1. **テストを先に書く**
2. **失敗することを確認**
3. **テストをコミット**
4. **テストが通るコードを書く**

## Real Example

[cc-safe](https://github.com/ykdojo/cc-safe)はこの方法で構築：

1. 失敗するテストを先に書く
2. コミット
3. Claude Codeに実装させる
4. テストが通ることを確認

## Extra Verification

テストが正しいか確認したい場合：
- テスト自体をレビュー
- 単に`true`を返していないか確認

## Why This Matters

- コードベースが大きくなるほどテストが重要
- TDDはClaude Codeと相性が良い
- 明確な契約（テスト）があると実装が正確

## See Also

- [Tip 9: Write-test cycle](./tip-09.md) - 書き込み-テストサイクル
- [Tip 28: Verifying output](./tip-28.md) - 出力検証
