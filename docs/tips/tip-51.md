# Tip 51: Create a /learn command for continuous learning

> /learn コマンドを作成して継続的に学習する

**Category**: Custom Commands
**Related**: [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md)

## Overview

セッションから有用なパターンを抽出し、CLAUDE.md に保存するカスタムコマンドを作成できる。これにより、プロジェクト固有の知識を蓄積できる。

> **注意**: `/learn` は公式の Claude Code 機能ではなく、カスタムコマンドとして自分で実装するものです。

## Implementation

`.claude/commands/learn.md` を作成：

```markdown
# Learn Command

現在のセッションを分析し、有用なパターンを抽出して CLAUDE.md に追記する。

## 手順

1. このセッションで行った作業を振り返る
2. 再利用可能なパターンを特定する：
   - プロジェクト固有のコーディングパターン
   - エラー解決のアプローチ
   - テスト戦略
   - ビルド・デプロイ手順
3. 抽出したパターンを `.claude/CLAUDE.md` に追記する形式で提案する

## 出力形式

以下のパターンを学習しました：

### [パターン名]
- 説明: ...
- 適用場面: ...

CLAUDE.md への追記案として提示する。
```

## Usage

```
/learn
```

## Example Session

```
You: このプロジェクトではzustandを使ってる

Claude: 了解しました。zustandでの状態管理を行います。

... 作業完了後 ...

You: /learn

Claude: 以下のパターンを学習しました：

### 状態管理パターン
- 説明: zustand を使用した状態管理
- 適用場面: グローバルステート

CLAUDE.md への追記案：
## State Management
- zustand を使用
- ストアは /src/stores/ に配置
- createSelectors パターンを使用
```

## Where Learnings Are Stored

抽出したパターンは手動で以下に追記する：

- `~/.claude/CLAUDE.md` - グローバルな学習（全プロジェクト共通）
- `.claude/CLAUDE.md` - プロジェクト固有の学習

## Alternative: Use /memory

公式機能の `/memory` コマンドでも CLAUDE.md を編集できる：

```
/memory
```

これにより CLAUDE.md をエディタで開いて直接編集できる。

## Why This Matters

- 同じ説明を繰り返す必要がなくなる
- プロジェクト固有の知識が蓄積される
- チーム間での知識共有が容易になる

## See Also

- [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md) - 設定の使い分け
- [Tip 44: Leverage CLAUDE.md hierarchical loading](./tip-44.md) - CLAUDE.mdの階層構造
