# Tip 40: Simplify overcomplicated code

> 複雑すぎるコードをシンプルにする

**Category**: Code Quality
**Related**: [Tip 28: Verifying output](./tip-28.md), [Tip 18: Writing assistant](./tip-18.md)

## Overview

Claude Codeは時々物事を複雑にしすぎ、コードを書きすぎる傾向がある。要求していない変更を加えることも。

## The Problem

- コードは動くかもしれない
- しかしメンテナンスが難しい
- レビューが難しい

## The Solution

コードをチェックして簡素化を依頼：

```
> なぜこの変更を加えた？

> なぜこの行を追加した？

> これを簡素化して
```

## Understanding Generated Code

「AIだけでコードを書くと理解できない」と言う人がいるが、十分な質問をすれば理解できる。

大規模プロジェクトでは、AIに質問することで人間だけより速く理解できることも。

## Applies to Prose Too

文章にも同じことが言える：
- 前の段落を最後の段落で要約しがち
- 繰り返しが多くなりがち

→ 削除や簡素化を依頼

## See Also

- [Tip 28: Verifying output](./tip-28.md) - 出力の検証
- [Tip 18: Writing assistant](./tip-18.md) - ライティング
