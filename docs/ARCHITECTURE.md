# Architecture Overview

Claude Code Tipsは、Claude Code（Anthropicの公式CLI）を最大限に活用するためのナレッジベース・ツール集・プラグイン配布リポジトリです。

## Directory Structure

```
claude-code-tips/
├── README.md              # メインドキュメント（43 Tips + プラグイン説明）
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

## Core Components

### Tips (README.md)
43個の実践的なTipsを提供。基礎（スラッシュコマンド、音声入力）から高度な技法（コンテナ運用、システムプロンプト最適化）まで。

### dx Plugin (.claude-plugin/)
このリポジトリ自体がClaude Codeプラグインとして機能。以下を提供：
- `/dx:gha` - GitHub Actions障害調査
- `/dx:handoff` - コンテキスト引き継ぎドキュメント生成
- `/dx:clone` - 会話複製
- `/dx:half-clone` - 会話半複製（コンテキスト削減）
- `reddit-fetch` スキル - Gemini CLI経由でRedditコンテンツ取得

### Scripts (scripts/)
- `context-bar.sh`: カスタマイズ可能なステータスライン（10色テーマ）
- `clone-conversation.sh`: 会話をUUID付きで複製
- `half-clone-conversation.sh`: 会話の後半のみ保持して複製
- `generate-toc.js`: README.mdの目次を自動生成

### System Prompt Optimization (system-prompt/)
Claude Codeのシステムプロンプトを約55%削減するパッチ。~20kトークン → ~9kトークン。

### Container (container/)
長時間実行・リスクのあるタスク用のDocker環境。`--dangerously-skip-permissions`を安全に使用可能。

## Key Files for Context

| ファイル | 目的 |
|----------|------|
| README.md | 全Tipsの詳細説明 |
| CLAUDE.md | プロジェクト固有の指示 |
| system-prompt/UPGRADING.md | パッチ適用・アップグレード手順 |
| container/README.md | Docker環境のセットアップ |
| scripts/README.md | スクリプトの使用方法 |

## For Agents

### Exploring This Repository
1. **全体理解**: このファイル → README.md
2. **特定機能**: 該当ディレクトリのREADME.md
3. **実装詳細**: 各スクリプト・コマンドファイル

### Tips Index
各Tipの詳細説明は `docs/tips/` を参照。
