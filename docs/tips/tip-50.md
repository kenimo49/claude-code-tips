# Tip 50: Design specialized agents and delegate

> 専門エージェントを設計して委譲する

**Category**: Agent
**Related**: [Tip 39: Use plan mode](./tip-39.md)

> **カスタム設定**: このTipで紹介するエージェントは、`CLAUDE.md` や `agents/` ディレクトリで定義するカスタム設定です。Claude Code の公式機能ではありません。

## Overview

Claude Codeでは専門的なエージェントを設計し、特定のタスクを委譲できる。各エージェントに限定されたスコープを与えることで、品質と効率が向上する。

> **重要**: 単に「あなたは〇〇の専門家です」とロールを与えるだけでは、LLMのアウトプットは向上しない。効果があるのは**具体的なタスク指示、チェックリスト、出力フォーマットの明示**である。以下の例では、ロール名よりも「何をチェックするか」「どう出力するか」の部分が重要。

## Common Agent Types

| エージェント | 役割 | スコープ |
|-------------|------|---------|
| `architect` | システム設計 | 構造の決定、依存関係の管理 |
| `code-reviewer` | コードレビュー | 品質チェック、ベストプラクティス確認 |
| `security-reviewer` | セキュリティ監査 | 脆弱性検出、OWASP準拠 |
| `test-writer` | テスト作成 | ユニットテスト、E2Eテスト |
| `doc-writer` | ドキュメント作成 | API仕様、README更新 |

## Delegation Pattern

CLAUDE.mdでエージェントを定義：

```markdown
## Agents

### architect
アーキテクチャの決定を行う。新機能の構造設計、依存関係の管理を担当。
出力: 設計ドキュメント（.md形式）

### code-reviewer
コードレビューを行う。以下をチェック：
- コーディング規約への準拠
- パフォーマンスの問題
- エラーハンドリング
出力: レビューコメント
```

## Agent Chaining

エージェントを連鎖させて複雑なタスクを実行：

```
1. architect → 設計ドキュメント作成
2. code-writer → 実装
3. test-writer → テスト作成
4. code-reviewer → レビュー
5. 修正 → 再レビュー
```

## Example: Security Review Agent

```markdown
### security-reviewer

以下のセキュリティ観点でコードをレビュー：

1. **入力検証**: すべてのユーザー入力はサニタイズされているか
2. **認証・認可**: 適切なアクセス制御があるか
3. **秘密情報**: ハードコードされた秘密情報がないか
4. **SQL/XSS**: インジェクション脆弱性がないか

問題を発見した場合は重大度（Critical/High/Medium/Low）を付けて報告。
```

## What Actually Works

ロール名ではなく、以下の要素がアウトプット品質を向上させる：

| 要素 | 例 |
|------|-----|
| **具体的なチェックリスト** | OWASP Top 10 の各項目を列挙 |
| **明確な出力フォーマット** | 「重大度（Critical/High/Medium/Low）を付けて報告」 |
| **スコープの限定** | 「このファイルのみ確認」「認証関連のみ」 |
| **手順の明示** | 「まずXを確認、次にYを確認」 |

## Why This Matters

- ~~専門性による品質向上~~ → **具体的な指示による品質向上**
- タスクの明確な分離
- 並列処理による効率化
- チェックリストによるレビュー漏れの防止

## See Also

- [Tip 39: Use plan mode](./tip-39.md) - 計画モードでの作業
- [Tip 57: Automate security review](./tip-57.md) - セキュリティレビューの自動化
