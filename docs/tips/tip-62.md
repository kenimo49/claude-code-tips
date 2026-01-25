# Tip 62: Validate inputs with Zod schemas

> Zod スキーマで入力を検証する

**Category**: Validation
**Related**: [Tip 61: Use error boundaries to prevent crashes](./tip-61.md), [Tip 63: Never include secrets in code](./tip-63.md)

## Overview

API の入力は必ず Zod スキーマで検証する。ユーザー入力はすべてサニタイズし、型安全性を確保する。

## Basic Usage

```typescript
import { z } from 'zod';

// スキーマ定義
const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
});

// 型を自動生成
type User = z.infer<typeof UserSchema>;

// 検証
const result = UserSchema.safeParse(input);
if (!result.success) {
  console.error(result.error.issues);
  return;
}
const user = result.data; // 型安全な User
```

## API Input Validation

```typescript
// Express + Zod
import express from 'express';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).max(10).optional(),
});

app.post('/posts', (req, res) => {
  const result = CreatePostSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: result.error.issues,
    });
  }

  const { title, content, tags } = result.data;
  // 安全に使用できる
});
```

## Common Patterns

### Sanitization

```typescript
const SafeStringSchema = z.string()
  .trim()
  .min(1)
  .transform(s => s.replace(/<[^>]*>/g, '')); // HTMLタグ除去
```

### Enums

```typescript
const StatusSchema = z.enum(['draft', 'published', 'archived']);
```

### Union Types

```typescript
const ResponseSchema = z.union([
  z.object({ success: z.literal(true), data: z.any() }),
  z.object({ success: z.literal(false), error: z.string() }),
]);
```

### Nested Objects

```typescript
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string().regex(/^\d{3}-\d{4}$/),
});

const UserWithAddressSchema = z.object({
  name: z.string(),
  address: AddressSchema,
});
```

## Form Validation (React Hook Form)

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      {/* ... */}
    </form>
  );
}
```

## CLAUDE.md での指示例

```markdown
## Input Validation

- すべてのAPI入力は Zod スキーマで検証
- ユーザー入力は trim() と サニタイズ を適用
- 型は z.infer で自動生成
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **データ構造の明示化**: スキーマ定義により、Claude Code がデータ構造を即座に理解できる
- **問題特定の効率化**: 検証エラーが具体的なため、バグの原因特定が容易
- **コード生成の一貫性**: スキーマを参照することで、一貫した型安全なコードを生成できる

## Why This Matters

- 実行時の型安全性を確保
- 不正な入力によるバグを防止
- エラーメッセージを一元管理

## See Also

- [Tip 61: Use error boundaries to prevent crashes](./tip-61.md) - エラーハンドリング
- [Tip 63: Never include secrets in code](./tip-63.md) - 秘密情報の管理
