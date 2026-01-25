# Tip coding-03: Avoid N+1 queries

> N+1 クエリを回避する

**Category**: Performance
**Related**: [Tip 54: Design verification loops](./tip-54.md)

## Overview

ループ内でデータベースクエリを実行する N+1 問題を避ける。複数のIDを一括取得し、Map で効率的にマッピングするパターンを使用する。

## The N+1 Problem

```typescript
// ❌ N+1 クエリ（1 + N回のクエリ）
const posts = await getPosts(); // 1回
for (const post of posts) {
  post.author = await getUser(post.authorId); // N回
}
```

100件の投稿があれば、101回のデータベースクエリが発生。

## Solution: Batch Fetching

```typescript
// ✅ 2回のクエリで完了
const posts = await getPosts();

// すべてのauthorIdを収集
const authorIds = [...new Set(posts.map(p => p.authorId))];

// 一括取得
const authors = await getUsersByIds(authorIds);

// Mapでマッピング
const authorMap = new Map(authors.map(a => [a.id, a]));

// 結果を組み立て
const postsWithAuthors = posts.map(post => ({
  ...post,
  author: authorMap.get(post.authorId)
}));
```

## DataLoader Pattern

GraphQL でよく使われるパターン：

```typescript
import DataLoader from 'dataloader';

// バッチ関数を定義
const userLoader = new DataLoader(async (ids: string[]) => {
  const users = await getUsersByIds(ids);
  const userMap = new Map(users.map(u => [u.id, u]));
  return ids.map(id => userMap.get(id));
});

// 使用時（自動的にバッチ化される）
const author = await userLoader.load(post.authorId);
```

## ORM での対策

### Prisma

```typescript
// ❌ N+1
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({
    where: { id: post.authorId }
  });
}

// ✅ Include で一括取得
const posts = await prisma.post.findMany({
  include: { author: true }
});
```

### TypeORM

```typescript
// ✅ Relations を使用
const posts = await postRepository.find({
  relations: ['author']
});
```

## Detection

```sql
-- クエリログで同じテーブルへの大量のSELECTを検出
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;
SELECT * FROM users WHERE id = 3;
-- ... これは N+1 の兆候
```

## CLAUDE.md での指示例

```markdown
## Database Guidelines

### N+1 Prevention
- ループ内でクエリを実行しない
- 関連データは include/join で一括取得
- 複数IDは IN 句で一括取得
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **パフォーマンス問題調査の削減**: N+1 を防ぐことで、パフォーマンスデバッグに費やすコンテキストが減る
- **明確な指示が可能**: パターンを CLAUDE.md に記載することで、一貫したコード生成を促せる
- **コードレビュー効率化**: 一括取得パターンが標準化され、レビュー時の確認ポイントが明確

## Why This Matters

- データベース負荷を大幅に削減
- レスポンス時間を短縮
- スケーラビリティを向上

## See Also

- [Tip 54: Design verification loops](./tip-54.md) - 検証ループ
