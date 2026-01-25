# Tip 50: Design specialized agents and delegate

> 専門エージェントを設計して委譲する

**Category**: Agent
**Related**: [Tip 39: Use plan mode](./tip-39.md)

## Overview

Claude Codeでは専門的なエージェントを設計し、特定のタスクを委譲できる。各エージェントに限定されたスコープを与えることで、品質と効率が向上する。

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

## Why This Matters

- 専門性による品質向上
- タスクの明確な分離
- 並列処理による効率化
- レビュー漏れの防止

## See Also

- [Tip 39: Use plan mode](./tip-39.md) - 計画モードでの作業
- [Tip 57: Automate security review](./tip-57.md) - セキュリティレビューの自動化
