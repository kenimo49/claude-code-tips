# Tip 30: Keep CLAUDE.md simple and concise

> CLAUDE.mdはシンプルで簡潔に保つ

**Category**: Setup
**Related**: [Tip 25: Understanding CLAUDE.md](./tip-25.md), [Tip 12: Invest in workflow](./tip-12.md)

## Overview

CLAUDE.mdは本当にシンプルで簡潔に保つべき。最初はなくても良い。

## The Approach

1. **CLAUDE.mdなしで始める**
2. 同じことを繰り返し伝えていると気づいたら追加
3. Claude Codeに編集させる

## How to Add

`#` シンボルでメモリに追加する機能もあるが、直接頼む方がシンプル：

```
> これをプロジェクトのCLAUDE.mdに追加して
```

または：

```
> これをグローバルのCLAUDE.mdに追加して
```

Claude Codeが適切なファイルを編集してくれる。

## Why Keep It Simple

- 長いCLAUDE.mdはトークンを消費
- 本当に必要なものだけ記載
- 必要に応じて成長させる

## Example Structure

```markdown
# Project Instructions

- 日本語で応答
- コミットにAI表記を入れない
- テスト: npm test
```

## See Also

- [Tip 25: Understanding CLAUDE.md](./tip-25.md) - 各機能の違い
- [Tip 15: Slim down system prompt](./tip-15.md) - システムプロンプト最適化
