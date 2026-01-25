# Tip 53: Visualize architecture with code maps

> コードマップでアーキテクチャを可視化する

**Category**: Documentation
**Related**: [Tip 30: Keep CLAUDE.md simple](./tip-30.md)

## Overview

コードマップを作成することで、大規模なコードベースの構造をClaude Codeに効率的に伝えられる。TypeScript ASTを分析して自動生成することも可能。

## Code Map Structure

以下のようなファイル構成でアーキテクチャを文書化：

```
docs/codemaps/
├── frontend.md      # フロントエンド構造
├── backend.md       # バックエンド構造
├── database.md      # データベーススキーマ
└── integrations.md  # 外部連携
```

## Example: frontend.md

```markdown
# Frontend Architecture

## Component Structure
- `src/components/` - 再利用可能なUIコンポーネント
  - `Button/` - ボタンコンポーネント
  - `Form/` - フォーム関連コンポーネント
- `src/pages/` - ページコンポーネント
- `src/hooks/` - カスタムフック

## State Management
- zustand を使用
- ストアは `src/stores/` に配置

## Data Flow
User Action → Component → Store → API → Server
```

## Auto-Generation with AST Analysis

TypeScript ASTを使った自動生成スクリプトの例：

```typescript
// scripts/generate-codemap.ts
import * as ts from 'typescript';
import * as fs from 'fs';

function analyzeFile(filePath: string): string[] {
  const source = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest
  );

  const exports: string[] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isExportDeclaration(node) ||
        (ts.isFunctionDeclaration(node) &&
         node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))) {
      // エクスポートされた関数を収集
      exports.push(node.getText());
    }
  });

  return exports;
}
```

## Custom Command

CLAUDE.mdで更新コマンドを定義：

```markdown
## Commands

### /update-codemaps
コードマップを自動更新する。
1. TypeScript ASTでコード構造を分析
2. docs/codemaps/ 以下のファイルを更新
3. 変更をコミット
```

## Why This Matters

- 大規模コードベースのナビゲーションが容易に
- 新しい開発者のオンボーディングを加速
- Claude Codeが効率的にコンテキストを把握できる

## See Also

- [Tip 30: Keep CLAUDE.md simple](./tip-30.md) - CLAUDE.mdはシンプルに
- [Tip 44: Leverage CLAUDE.md hierarchical loading](./tip-44.md) - 階層的な設定
