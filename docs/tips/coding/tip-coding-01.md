# Tip coding-01: Embrace immutability

> イミュータビリティを徹底する

**Category**: Best Practices
**Related**: [Tip coding-02: Keep file sizes small](./tip-coding-02.md)

## Overview

データの直接変更（ミューテーション）を避け、イミュータブルなパターンを使用する。バグの防止、デバッグの容易さ、予測可能な状態管理につながる。

## Immutable Patterns

### Objects

```typescript
// ❌ ミューテーション
user.name = "Alice";

// ✅ イミュータブル
const updatedUser = { ...user, name: "Alice" };
```

### Arrays

```typescript
// ❌ ミューテーション
items.push(newItem);
items[0] = updatedItem;
items.splice(1, 1);

// ✅ イミュータブル
const withNewItem = [...items, newItem];
const withUpdate = items.map((item, i) => i === 0 ? updatedItem : item);
const withoutSecond = items.filter((_, i) => i !== 1);
```

### Nested Objects

```typescript
// ❌ ミューテーション
state.user.profile.name = "Bob";

// ✅ イミュータブル
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Bob"
    }
  }
};
```

## Why Mutations Are Dangerous

```typescript
// 予期しない副作用の例
function processUsers(users: User[]) {
  users.sort((a, b) => a.name.localeCompare(b.name)); // 元配列を変更！
  return users.slice(0, 10);
}

const original = getUsers();
const processed = processUsers(original);
// original も変更されている！
```

## Immutable-by-Default Libraries

| ライブラリ | 用途 |
|-----------|------|
| **Immer** | イミュータブルな更新を簡潔に記述 |
| **Immutable.js** | イミュータブルなデータ構造 |
| **zustand** | イミュータブルな状態管理 |

## Immer Example

```typescript
import { produce } from 'immer';

const newState = produce(state, draft => {
  // draft は "ミュータブルに" 操作できる
  draft.user.profile.name = "Bob";
  draft.items.push(newItem);
});
// 実際にはイミュータブルな更新が行われる
```

## CLAUDE.md での指示例

```markdown
## Coding Standards

### Immutability
- オブジェクトと配列は常にイミュータブルに更新
- `push`, `splice`, 直接代入は禁止
- スプレッド演算子または Immer を使用
```

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **デバッグコンテキストの削減**: 予測可能なコードはバグが少なく、問題調査に費やすコンテキストが減る
- **状態追跡の効率化**: 変更履歴が明確なため、関連コードの探索が容易
- **影響範囲の特定**: ミューテーションがないため、変更の影響範囲を素早く把握できる

## Why This Matters

- バグの原因となる副作用を防げる
- 状態の変更履歴を追跡しやすい
- React などのフレームワークで正しく再レンダリングされる

## See Also

- [Tip coding-02: Keep file sizes small](./tip-coding-02.md) - ファイルサイズの管理
