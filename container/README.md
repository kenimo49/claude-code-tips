# Claude Code コンテナ

リスクのある長時間実行エージェントタスクを隔離環境で実行するためのDockerコンテナ。Claude Code、Gemini CLI（ブロックされたサイトへのフォールバック用）、このリポジトリのすべてのカスタマイズを含みます。

> **注意**: このリポジトリは [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) の日本語版です。

## なぜこれを使うのか

- **隔離**: 何か問題が起きても封じ込められる
- **長時間タスク**: ターミナルを占有せずに実行させ続けられる
- **YOLOモード**: サンドボックス環境ですべてを自動承認
- **再現可能なセットアップ**: 毎回同じ設定

## クイックスタート

```bash
# イメージをビルド (containerディレクトリから、またはDockerfileがある任意の場所で)
docker build -t claude-code-container -f Dockerfile .

# 実行
docker run -it claude-code-container
```

Dockerfileはビルド時にGitHubから最新の `claude-code-tips` リポジトリをプルするため、ローカルファイルは不要です。

## 初回認証

コンテナを起動した後、両方のCLIを手動で認証する必要があります:

### 1. Claude Code

```bash
claude
```

プロンプトに従ってAnthropicアカウントでログインします。ブラウザURLが開きます - 必要に応じてホストブラウザにコピーしてください。

### 2. Gemini CLI

```bash
gemini
```

プロンプトに従ってGoogleアカウントでログインします。

## 含まれるもの

- **Claude Code 2.0.56** システムプロンプトパッチ適用済み（約39%のトークン節約）
- **Gemini CLI** `gemini-3-pro-preview` モデルで設定済み
- **tmux** reddit-fetchスキル用
- **ステータスバー** モデル、Git状態、トークン使用量を表示
- **スキル** (reddit-fetch) コンテナに組み込み済み

## 認証の永続化

Geminiの再認証を毎回避けるには、認証情報ディレクトリをマウント:

```bash
docker run -it \
  -v ~/.gemini:/home/claude/.gemini \
  claude-code-container
```

注意: Claude Codeの認証情報はmacOSキーチェーンに保存されるため、毎回Claudeの再認証が必要です（または `ANTHROPIC_API_KEY` 環境変数を使用）。

## プロジェクトでの作業

プロジェクトディレクトリをマウント:

```bash
docker run -it \
  -v /path/to/your/project:/home/claude/workspace \
  claude-code-container
```

そして `cd /home/claude/workspace` でClaude Codeを開始します。

## 更新

最新の変更を取得するには:

1. イメージを再ビルド: `docker build --no-cache -t claude-code-container -f Dockerfile .`
2. 新しいコンテナを実行

`--no-cache` フラグでGitHubから最新版を確実にプルします。
