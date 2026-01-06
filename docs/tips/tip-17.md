# Tip 17: Manual exponential backoff for long-running jobs

> 長時間ジョブに手動エクスポネンシャルバックオフ

**Category**: Automation
**Related**: [Tip 36: Background execution](./tip-36.md), [Tip 29: DevOps](./tip-29.md)

## Overview

DockerビルドやGitHub CIなど長時間ジョブの待機中、エクスポネンシャルバックオフでステータスをチェックさせる。

## The Concept

```
1分待つ → チェック
2分待つ → チェック
4分待つ → チェック
8分待つ → チェック
...
```

AIが手動でこのパターンを実行。プログラム的ではないが効果的。

## Example

Dockerビルドの進捗チェック：

```
> Dockerビルドの状態をエクスポネンシャルバックオフでチェックして。
> 1分、2分、4分と間隔を増やして。完了したら教えて。
```

## Why Not gh run watch?

`gh run watch`は継続的に多くの行を出力してトークンを消費する。

代わりに：
```bash
gh run view <run-id> | grep <job-name>
```

これを手動エクスポネンシャルバックオフで繰り返す方がトークン効率が良い。

## Use Cases

- Dockerビルド
- GitHub Actions CI
- 長時間のテスト実行
- デプロイ待機

## See Also

- [Tip 36: Background execution](./tip-36.md) - バックグラウンド実行
- [Tip 29: DevOps](./tip-29.md) - GitHub Actions調査
