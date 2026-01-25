# Tip 63: Never include secrets in code

> 秘密情報は絶対にコードに含めない

**Category**: Security
**Related**: [Tip 57: Automate security review](./tip-57.md), [Tip 62: Validate inputs with Zod schemas](./tip-62.md)

## Overview

すべてのシークレット（API キー、パスワード、トークンなど）は環境変数で管理する。`.env.example` で必須変数を文書化し、`git-secrets` でコミット前に検出する。

## Environment Variables

### .env (gitignore)

```bash
# .env - 絶対にコミットしない
DATABASE_URL=postgresql://user:password@localhost:5432/db
API_KEY=sk-live-xxxxxxxxxxxxx
JWT_SECRET=your-super-secret-key
```

### .env.example (コミット)

```bash
# .env.example - 必須変数を文書化
DATABASE_URL=postgresql://user:password@localhost:5432/db
API_KEY=your-api-key-here
JWT_SECRET=generate-a-secure-random-string
```

## Accessing Environment Variables

```typescript
// ❌ ハードコード
const apiKey = 'sk-live-xxxxxxxxxxxxx';

// ✅ 環境変数
const apiKey = process.env.API_KEY;

// ✅ 検証付き
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const apiKey = getRequiredEnv('API_KEY');
```

## git-secrets Setup

```bash
# インストール
brew install git-secrets  # macOS
# または
sudo apt install git-secrets  # Ubuntu

# リポジトリで有効化
git secrets --install
git secrets --register-aws  # AWS パターンを追加

# カスタムパターンを追加
git secrets --add 'sk-live-[a-zA-Z0-9]{24}'
git secrets --add 'password\s*=\s*.+'

# スキャン実行
git secrets --scan
git secrets --scan-history
```

## Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# git-secrets でスキャン
git secrets --pre_commit_hook -- "$@"

# 追加のパターンチェック
if git diff --cached | grep -E '(api_key|secret|password)\s*=\s*["\047][^"\047]+["\047]'; then
  echo "Error: Potential secret detected in commit"
  exit 1
fi
```

## Secret Patterns to Block

| パターン | 例 |
|----------|-----|
| AWS Keys | `AKIA[0-9A-Z]{16}` |
| Stripe Keys | `sk_live_[a-zA-Z0-9]{24}` |
| Generic Passwords | `password\s*=\s*".+"` |
| Private Keys | `-----BEGIN RSA PRIVATE KEY-----` |
| JWT Tokens | `eyJ[a-zA-Z0-9_-]*\.eyJ` |

## .gitignore

```gitignore
# 環境変数
.env
.env.local
.env.*.local

# 秘密情報が含まれる可能性
*.pem
*.key
credentials.json
secrets.yaml
```

## CLAUDE.md での指示例

```markdown
## Security Rules

### Secrets Management
- 秘密情報は絶対にコードにハードコードしない
- すべてのシークレットは環境変数で管理
- .env.example で必須変数を文書化
- コミット前に git-secrets でスキャン
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **安全なコンテキスト共有**: 秘密情報が分離されているため、コード全体を安全にコンテキストに含められる
- **環境設定の理解効率化**: .env.example で必要な環境変数が明確になり、セットアップの探索が不要
- **セキュリティレビューの効率化**: 秘密情報の検出パターンが明確で、自動チェックが可能

## Why This Matters

- 秘密情報の漏洩を防止
- Git履歴に秘密情報が残らない
- チーム間で安全に設定を共有

## See Also

- [Tip 57: Automate security review](./tip-57.md) - セキュリティレビュー
- [Tip 62: Validate inputs with Zod schemas](./tip-62.md) - 入力検証
