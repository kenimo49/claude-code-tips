# Claude Code スクリプト

> **注意**: このリポジトリは [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) の日本語版です。

## context-bar.sh

Claude Code用の2行ステータスラインスクリプト。モデル名、ディレクトリ、Gitブランチ、未コミットファイル数、originとの同期状態、コンテキスト使用量、最後のメッセージを表示します。

**出力例:**
```
Opus 4.5 | 📁claude-code-tips | 🔀main (scripts/context-bar.sh uncommitted, synced 12m ago) | ██░░░░░░░░ 18% of 200k tokens
💬 This is good. I don't think we need to change the documentation as long as we don't say that the default color is orange el...
```

### インストール

1. スクリプトをClaude scriptsディレクトリにコピー:
   ```bash
   mkdir -p ~/.claude/scripts
   cp context-bar.sh ~/.claude/scripts/
   chmod +x ~/.claude/scripts/context-bar.sh
   ```

2. `~/.claude/settings.json` を更新:
   ```json
   {
     "statusLine": {
       "type": "command",
       "command": "~/.claude/scripts/context-bar.sh"
     }
   }
   ```

これで完了です！

### カラーテーマ

スクリプトはモデル名とプログレスバーのオプションカラーテーマをサポートしています。スクリプト先頭の `COLOR` 変数を編集してください:

```bash
# カラーテーマ: gray, orange, blue, teal, green, lavender, rose, gold, slate, cyan
COLOR="orange"
```

`bash scripts/color-preview.sh` でプレビューを表示:

![カラープレビュー](color-preview.png)

### 必要条件

- `jq` (JSON解析用)
- `bash`
- `git` (オプション、ブランチ表示用)
- Claude Code 2.0.65以上 (動作確認済み。古いバージョンでは必要なJSONフィールドがない可能性あり - 古いバージョン用は過去のコミットを参照)

### 仕組み

Claude Codeはステータスラインコマンドにセッションメタデータをstdin経由でJSONとして渡します:
- `model.display_name` - モデル名
- `cwd` - 現在の作業ディレクトリ
- `context_window.total_input_tokens` - 使用した入力トークン数
- `context_window.total_output_tokens` - 使用した出力トークン数
- `context_window.context_window_size` - 最大コンテキストウィンドウサイズ
- `transcript_path` - セッショントランスクリプトJSONLファイルへのパス

スクリプトはこれらのJSONフィールドを使用してコンテキスト使用量（入力+出力トークン）を計算し、コンテキストウィンドウに対するパーセンテージを表示します。正確なトークン内訳は `/context` コマンドで確認できます。
