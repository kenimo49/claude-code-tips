# Tip coding-02: Keep file sizes small

> ファイルサイズを小さく保つ

**Category**: Best Practices
**Related**: [Tip coding-01: Embrace immutability](./tip-coding-01.md)

## Overview

ファイルは200-400行を標準とし、800行を上限とする。ドメインや機能で構成し、高い凝集性と低い結合度を目指す。

## File Size Guidelines

| サイズ | 状態 | アクション |
|--------|------|-----------|
| **〜200行** | 理想的 | そのまま維持 |
| **200-400行** | 標準 | 問題なし |
| **400-600行** | 注意 | 分割を検討 |
| **600-800行** | 警告 | 分割を計画 |
| **800行以上** | 要対応 | 即座に分割 |

## Organization Principles

### ✅ ドメイン/機能で構成

```
src/
  features/
    auth/
      LoginForm.tsx
      useAuth.ts
      authApi.ts
      authTypes.ts
    cart/
      Cart.tsx
      useCart.ts
      cartApi.ts
```

### ❌ タイプ別構成（避ける）

```
src/
  components/
    LoginForm.tsx
    Cart.tsx
  hooks/
    useAuth.ts
    useCart.ts
  api/
    authApi.ts
    cartApi.ts
```

## High Cohesion, Low Coupling

### 高い凝集性
- 関連する機能を同じファイル/フォルダに
- 1つのファイルは1つの責務

### 低い結合度
- ファイル間の依存を最小化
- インターフェースを介して通信

## Splitting Strategies

### 1. コンポーネントの分割

```typescript
// ❌ 巨大なコンポーネント
// UserProfile.tsx (600行)

// ✅ 分割
// UserProfile.tsx (100行) - メイン
// UserAvatar.tsx (80行) - アバター部分
// UserStats.tsx (120行) - 統計部分
// UserActions.tsx (100行) - アクション部分
```

### 2. ロジックの分割

```typescript
// ❌ すべてのロジックが1ファイル
// userService.ts (800行)

// ✅ 分割
// userAuth.ts - 認証関連
// userProfile.ts - プロフィール関連
// userPreferences.ts - 設定関連
```

## CLAUDE.md での指示例

```markdown
## File Guidelines

- 1ファイル 200-400行を目標、800行を超えない
- ドメイン/機能でファイルを構成
- 600行を超えたら分割を検討
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **効率的なファイル読み込み**: 小さいファイルはコンテキストウィンドウに収まりやすく、全体を一度に理解できる
- **関連ファイル探索の効率化**: ドメイン単位の構成により、機能に関連するファイルがまとまっている
- **変更影響の局所化**: 小さなファイルは変更の影響範囲が限定され、調査対象が明確

## Why This Matters

- コードの可読性が向上
- 変更の影響範囲が限定される
- レビューが容易になる
- Claude Code がファイル全体を効率的に読める

## See Also

- [Tip coding-01: Embrace immutability](./tip-coding-01.md) - イミュータビリティ
