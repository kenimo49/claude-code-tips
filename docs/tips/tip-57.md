# Tip 57: Automate security review

> セキュリティレビューを自動化する

**Category**: Security
**Related**: [Tip 50: Design specialized agents and delegate](./tip-50.md), [Tip 63: Never include secrets in code](./tip-63.md)

> **カスタム設定**: このTipで紹介する `security-reviewer` エージェントと `/security-review` コマンドは、`agents/security-reviewer.md` や `commands/` で定義するカスタム設定です。Claude Code の公式機能ではありません。

## Overview

security-reviewer エージェントを設計し、OWASP Top 10に基づくセキュリティチェックを自動化する。コードレビューの一環としてセキュリティ監査を組み込む。

## Security Reviewer Agent

CLAUDE.md でセキュリティレビューエージェントを定義：

```markdown
## Agents

### security-reviewer

コードのセキュリティレビューを行う。以下をチェック：

#### OWASP Top 10 チェックリスト
1. **Injection**: SQL/NoSQL/OS コマンドインジェクション
2. **Broken Authentication**: 認証の欠陥
3. **Sensitive Data Exposure**: 機密データの露出
4. **XXE**: XML外部エンティティ参照
5. **Broken Access Control**: アクセス制御の欠陥
6. **Security Misconfiguration**: セキュリティ設定のミス
7. **XSS**: クロスサイトスクリプティング
8. **Insecure Deserialization**: 安全でないデシリアライゼーション
9. **Components with Known Vulnerabilities**: 既知の脆弱性
10. **Insufficient Logging**: 不十分なログ記録

#### 追加チェック
- ハードコードされた秘密情報
- 安全でない暗号化
- レート制限の欠如
```

## Automated Checks

### Hardcoded Secrets Detection

```bash
# git-secrets を使用
git secrets --scan

# grep でパターン検出
grep -rn "password\s*=" --include="*.ts" --include="*.js"
grep -rn "api_key\s*=" --include="*.ts" --include="*.js"
```

### Dependency Vulnerability Scan

```bash
npm audit
# または
npx snyk test
```

## Integration with Hooks

```json
{
  "hooks": {
    "PreCommit": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "git secrets --scan-history 2>&1 || echo 'Warning: Potential secrets detected'"
          }
        ]
      }
    ]
  }
}
```

## Security Review Checklist Command

```markdown
## Commands

### /security-review
現在の変更に対してセキュリティレビューを実行：
1. `git diff` で変更を取得
2. OWASP Top 10 に基づきチェック
3. 発見した問題を重大度付きで報告
4. 修正案を提示
```

## Severity Levels

| レベル | 説明 | 対応 |
|--------|------|------|
| **Critical** | 即座に悪用可能 | 即時修正必須 |
| **High** | 悪用の可能性が高い | リリース前に修正 |
| **Medium** | 条件付きで悪用可能 | 計画的に修正 |
| **Low** | 影響は限定的 | 改善を推奨 |

## Why This Matters

- セキュリティ問題を早期に発見できる
- 一貫したセキュリティ基準を維持できる
- 本番環境への脆弱性混入を防げる

## See Also

- [Tip 50: Design specialized agents and delegate](./tip-50.md) - エージェント設計
- [Tip 63: Never include secrets in code](./tip-63.md) - 秘密情報の管理
