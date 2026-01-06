# Tip 9: Complete the write-test cycle for autonomous tasks

> 自律的なタスクには書き込み-テストサイクルを完結させる

**Category**: Testing
**Related**: [Tip 34: TDD](./tip-34.md), [Tip 21: Containers](./tip-21.md)

## Overview

Claude Codeを自律的に動かすには、結果を検証する方法を与える必要がある。書いて、実行して、出力を確認して、繰り返す。

## The tmux Pattern

インタラクティブなターミナルをテストするにはtmuxを使用：

```bash
# セッションを作成
tmux kill-session -t test-session 2>/dev/null
tmux new-session -d -s test-session

# コマンドを送信
tmux send-keys -t test-session 'claude' Enter
sleep 2
tmux send-keys -t test-session '/context' Enter
sleep 1

# 出力をキャプチャ
tmux capture-pane -t test-session -p
```

## Use Case: git bisect

Claude Codeで`git bisect`を自動実行：
1. 各コミットでテストスクリプトを実行
2. 出力をキャプチャして判定
3. 問題のあるコミットを特定

## Creative Testing Strategies

- **Playwright MCP**: アクセシビリティツリーベースでWebテスト
- **Claude's Chrome**: スクリーンショットベースでWebテスト
- **外部CI**: ローカルでテストできない場合はドラフトPRを作成

### Playwright vs Chrome Integration

| 項目 | Playwright | Chrome統合 |
|------|------------|------------|
| 方式 | アクセシビリティツリー | スクリーンショット |
| 速度 | 速い | 遅い |
| 精度 | 高い | やや低い |
| 用途 | 一般的なタスク | ログイン状態が必要な場合 |

## See Also

- [Tip 21: Containers](./tip-21.md) - 長時間実行タスク
- [Tip 34: TDD](./tip-34.md) - テスト駆動開発
- [Tip 11: Gemini CLI](./tip-11.md) - tmuxパターンの応用
