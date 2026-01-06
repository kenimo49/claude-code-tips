# Tip 14: Multitasking with terminal tabs

> ターミナルタブでマルチタスク

**Category**: Workflow
**Related**: [Tip 16: Git worktrees](./tip-16.md), [Tip 36: Background execution](./tip-36.md)

## Overview

複数のClaude Codeインスタンスを実行する際は、整理が重要。同時に3〜4タスクに集中することを推奨。

## The Cascade Method

新しいタスクは常に右に新しいタブを開く。左から右へスイープするように作業を進める。

```
[Voice] [Docker] [Disk] [Project] [Writing]
   ←───────── 古い        新しい ─────────→
```

## Example Setup

1. **最左タブ**: 常駐（音声認識システムなど）
2. **2番目**: Dockerコンテナセットアップ
3. **3番目**: ディスク使用量チェック
4. **4番目**: エンジニアリングプロジェクト
5. **5番目（現在）**: ドキュメント作成

## Why This Matters

- 方向性の一貫性でナビゲーションが容易
- タスクの優先度が視覚的にわかる
- 古いタスクは左に、新しいタスクは右に

## See Also

- [Tip 16: Git worktrees](./tip-16.md) - 並列ブランチ作業との組み合わせ
- [Tip 36: Background execution](./tip-36.md) - バックグラウンド実行
