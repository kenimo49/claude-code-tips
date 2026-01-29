# Tip 46: Use Claude in Chrome from WSL2

> WSL2上からClaude in Chromeを使う

**Category**: Browser Automation
**Related**: [Tip 45: Execute PowerShell commands from WSL2](./tip-45.md)

## Overview

WSL2上のClaude CodeからChrome拡張機能「Claude in Chrome」を操作できる。WSLgを利用してLinux版Chromeを実行することで、ブラウザ自動化が可能になる。

## Prerequisites

- WSL2環境（WSLgが有効であること）
- Claude有料プラン（Claude in Chrome拡張機能の利用に必要）

## Setup Steps

### 1. Google Chromeのインストール

```bash
# .debパッケージをダウンロード
cd /tmp && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# インストール
sudo dpkg -i google-chrome-stable_current_amd64.deb

# 依存関係エラーが出た場合
sudo apt-get install -f -y

# バージョン確認
google-chrome --version
```

### 2. 日本語フォントのインストール（文字化け対策）

```bash
sudo apt install fonts-noto-cjk
```

### 3. Chromeの起動とWSLgの確認

```bash
google-chrome &
```

Chromeウィンドウが表示されればWSLgが正常に動作している。

### 4. Claude in Chrome拡張機能のインストール

1. ChromeでChrome Web Storeにアクセス
2. 「Claude」を検索してAnthropicの拡張機能をインストール
   - https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn
3. 拡張機能のサイドバーからClaudeアカウントにログイン

### 5. Chromeを起動しておく

Claude Codeから接続する前に、Chromeを起動しておく必要がある：

```bash
google-chrome &
```

自動化専用のプロファイルを作成している場合は、`--profile-directory`で指定：

```bash
google-chrome --profile-directory="Profile 1" &
```

### 6. Claude Codeから接続

Chromeが起動している状態で：

```bash
claude --chrome
```

## Important Notes

- **Headless modeは非対応**: Chrome拡張機能はheadlessモードでは動作しない
- **GUI必須**: WSLgによるGUI表示が必要
- **有料プラン必須**: Claude in Chromeは有料サブスクライバー向け機能

## Chrome Profile

Claude in Chrome拡張機能は専用のタブグループで動作する。これにより：

- **環境の分離**: 普段使いのブラウザ環境と分離できる
- **干渉の防止**: 他の拡張機能やブックマークが干渉しない
- **セキュリティ**: 自動化タスクがメインのブラウザ環境に影響を与えない

自動化専用の隔離された環境で安全にタスクを実行できる。

WSLg上のChromeプロファイルの保存場所や新規作成方法については [WSLg Chrome Profile](../knowledge/wslg-chrome-profile.md) を参照。

## Troubleshooting

### Chromeが起動しない場合

WSLgが有効か確認：
```bash
echo $DISPLAY
# 通常は ":0" が表示される
```

### 拡張機能に接続できない場合

1. Chromeを完全に終了して再起動
   ```bash
   pkill chrome
   google-chrome &
   ```
2. 拡張機能でClaudeアカウントにログイン済みか確認
3. `claude --chrome` で再接続

## Why This Matters

- WSL2環境でもブラウザ自動化が可能になる
- 開発とテストを同一環境で完結できる
- Claude Codeとブラウザの連携でビルド-テスト-修正ループを実現

## See Also

- [Claude in Chrome 公式ページ](https://claude.com/ja-jp/chrome) - Anthropic公式のClaude in Chrome紹介ページ
- [Tip 45: Execute PowerShell commands from WSL2](./tip-45.md) - WSL2とWindowsの連携
- [Tip 58: Use Chrome Fake Camera](./tip-58.md) - フェイクカメラでブラウザ自動化テスト
