# Tip 25: Understanding CLAUDE.md vs Skills vs Slash Commands vs Plugins

> CLAUDE.md、スキル、スラッシュコマンド、プラグインの違いを理解する

**Category**: Concepts
**Related**: [Tip 30: Keep CLAUDE.md simple](./tip-30.md), [Tip 11: Gemini CLI skill](./tip-11.md)

## Overview

似た機能があって混乱しやすいが、それぞれ役割が異なる。

## CLAUDE.md

**最もシンプル**。デフォルトプロンプトとして全会話で読み込まれる。

- プロジェクト固有: `./CLAUDE.md`
- グローバル: `~/.claude/CLAUDE.md`

プロジェクトの説明や共通指示に最適。

## Skills

**より構造化されたCLAUDE.md**。必要な時だけ読み込まれる。

- Claudeが自動的に関連性を判断して呼び出し
- ユーザーが手動で `/my-skill` で呼び出し可能
- トークン効率が良い

例：Google翻訳リンクを開くスキル（発音を聞きたい時だけ使用）

## Slash Commands

スキルと似ているが、**ユーザーが使うことを想定**。

- 正確なタイミングで呼び出したい時に最適
- ユーザー主導の操作向け

## Skills vs Slash Commands

| 項目 | Skills | Slash Commands |
|------|--------|----------------|
| 主な使用者 | Claude | ユーザー |
| 呼び出し | 自動/手動 | 手動 |
| 設計意図 | AI向け | 人間向け |

将来的に統合される可能性あり。

## Plugins

スキル、スラッシュコマンド、エージェント、フック、MCPサーバーをパッケージ化。

例：`dx`プラグインはこのリポジトリのコマンドとスキルをバンドル。

## See Also

- [Tip 30: Keep CLAUDE.md simple](./tip-30.md)
- [Tip 11: Gemini CLI skill](./tip-11.md)
- [dx plugin](/README.md#install-the-dx-plugin)
