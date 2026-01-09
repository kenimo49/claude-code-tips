# Tip 44: Leverage CLAUDE.md hierarchical loading

> CLAUDE.mdの階層的な読み込みを活用する

**Category**: Setup
**Related**: [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md), [Tip 30: Keep CLAUDE.md simple](./tip-30.md)

## Overview

Claude Codeは起動時にCLAUDE.mdファイルを再帰的に上方向へ検索する。これを理解すると、グローバル設定とプロジェクト固有の設定を効果的に分離できる。

## How It Works

例えば `/home/ken/workspace/project/` で起動した場合、以下の順序で読み込まれる：

1. `project/CLAUDE.md` を読み込み（プロジェクト固有のルール）
2. `workspace/CLAUDE.md` を読み込み（あれば）
3. `~/.claude/CLAUDE.md` を読み込み（ユーザーメモリ）

これは**上書きではなく累積的**に適用される。より深い階層のCLAUDE.mdが優先されるが、上位階層のルールも有効。

## Practical Examples

| 場所 | 用途 |
|------|------|
| `~/.claude/CLAUDE.md` | 全プロジェクト共通の設定（日本語で回答、コーディングスタイルなど） |
| `workspace/CLAUDE.md` | ワークスペース全体のルール |
| `project/CLAUDE.md` | プロジェクト固有のルール（フレームワーク、テスト方法など） |

## Check Loaded Files

現在読み込まれているCLAUDE.mdを確認：

```
/memory
```

## Why This Matters

- グローバルな設定は一度書けば全プロジェクトに適用
- プロジェクト固有の設定だけを各プロジェクトで管理
- 設定の重複を避けられる

## See Also

- [Tip 25: CLAUDE.md vs Skills vs Commands vs Plugins](./tip-25.md) - 概念の違いを理解
- [Tip 30: Keep CLAUDE.md simple](./tip-30.md) - シンプルに保つ
