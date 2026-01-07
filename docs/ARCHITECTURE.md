# アーキテクチャ概要

Claude Code Tipsは、Claude Code（Anthropicの公式CLI）を最大限に活用するためのナレッジベース・ツール集・プラグイン配布リポジトリです。

> **注意**: このリポジトリは [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) の日本語版です。オリジナルのライセンスと権利については元リポジトリを参照してください。

## ディレクトリ構造

```
claude-code-tips/
├── README.md              # メインドキュメント（日本語、44 Tips + プラグイン説明）
├── README.en.md           # 英語版README
├── CLAUDE.md              # プロジェクト固有の指示
├── docs/                  # ドキュメント
│   ├── ARCHITECTURE.md    # このファイル
│   └── tips/              # 各Tipの詳細説明
├── scripts/               # ユーティリティスクリプト
│   ├── context-bar.sh     # カスタムステータスライン
│   ├── clone-conversation.sh
│   ├── half-clone-conversation.sh
│   └── generate-toc.js    # README目次生成
├── commands/              # スラッシュコマンド定義
│   ├── clone.md
│   ├── half-clone.md
│   ├── handoff.md
│   └── gha.md
├── skills/                # Claude Codeスキル
│   └── reddit-fetch/
├── system-prompt/         # システムプロンプト最適化パッチ
│   ├── UPGRADING.md
│   └── 2.0.*/             # バージョン別パッチ
├── container/             # Docker環境
│   ├── Dockerfile
│   └── setup.sh
├── .claude-plugin/        # dxプラグイン定義
│   ├── plugin.json
│   └── marketplace.json
├── content/               # 追加コンテンツ・ストーリー
└── assets/                # 画像・ビジュアル資料
```

## コアコンポーネント

### Tips (README.md)

44個の実践的なTipsを提供。基礎（スラッシュコマンド、音声入力）から高度な技法（コンテナ運用、システムプロンプト最適化）まで。

### dxプラグイン (.claude-plugin/)

このリポジトリ自体がClaude Codeプラグインとして機能。以下を提供：
- `/dx:gha` - GitHub Actions障害調査
- `/dx:handoff` - コンテキスト引き継ぎドキュメント生成
- `/dx:clone` - 会話複製
- `/dx:half-clone` - 会話半複製（コンテキスト削減）
- `reddit-fetch` スキル - Gemini CLI経由でRedditコンテンツ取得

### スクリプト (scripts/)

- `context-bar.sh`: カスタマイズ可能なステータスライン（10色テーマ）
- `clone-conversation.sh`: 会話をUUID付きで複製
- `half-clone-conversation.sh`: 会話の後半のみ保持して複製
- `generate-toc.js`: README.mdの目次を自動生成

### システムプロンプト最適化 (system-prompt/)

Claude Codeのシステムプロンプトを約55%削減するパッチ。約20kトークン → 約9kトークン。

### コンテナ (container/)

長時間実行・リスクのあるタスク用のDocker環境。`--dangerously-skip-permissions`を安全に使用可能。

## 重要ファイル

| ファイル | 目的 |
|----------|------|
| README.md | 全Tipsの詳細説明（日本語） |
| README.en.md | 全Tipsの詳細説明（英語） |
| CLAUDE.md | プロジェクト固有の指示 |
| system-prompt/UPGRADING.md | パッチ適用・アップグレード手順 |
| container/README.md | Docker環境のセットアップ |
| scripts/README.md | スクリプトの使用方法 |

## エージェント向けガイド

### リポジトリ探索

1. **全体理解**: このファイル → README.md
2. **特定機能**: 該当ディレクトリのREADME.md
3. **実装詳細**: 各スクリプト・コマンドファイル

### Tipsインデックス

各Tipの詳細説明は `docs/tips/` を参照。
