# Tip 60: Access Claude Code from Smartphone via Tailscale SSH

> スマートフォンからWSL2にSSH接続してClaude Codeを操作する

**Category**: Workflow
**Related**: [Tip 45: Run PowerShell from WSL2](./tip-45.md), [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md)

## Overview

外出先でもスマートフォンからClaude Codeを使いたい。Tailscale（無料VPN）を使えば、スマートフォンから自宅のWSL2環境にSSH接続してClaude Codeを操作できる。

## Prerequisites

- WSL2環境（Ubuntu等）
- Tailscaleアカウント（無料）
- スマートフォン用SSHアプリ（ConnectBot、Termius等）

## Setup

### 1. WSL2にTailscaleをインストール

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

`sudo tailscale up` を実行すると認証用URLが表示されるので、ブラウザで開いてログインする。

### 2. SSHサーバーをインストール

```bash
sudo apt install openssh-server
sudo service ssh start
```

### 3. 自動起動を設定

WSL2でsystemdが有効な場合（`/etc/wsl.conf` に `systemd=true` がある場合）：

```bash
sudo systemctl enable ssh
sudo systemctl enable tailscaled
```

これでWSL起動時に両方が自動起動する。

### 4. Tailscale IPを確認

```bash
tailscale ip -4
# 例: 100.x.x.x
```

### 5. スマートフォンの設定

1. スマートフォンにTailscaleアプリをインストールして、同じアカウントでログイン
2. SSHアプリ（ConnectBot等）をインストール
3. 接続先として `<Tailscale IP>:22` を設定

## Why WSL2 Tailscale Instead of Windows?

同じPCでWindowsとWSL2の両方にTailscaleがあるとルーティングが競合する。そのためWSL2専用のTailscale IPを使う。

| 接続元 | 接続方法 |
|--------|----------|
| 同じPC上のWindows | ローカルIP（`192.168.x.x`）またはWSLコマンド |
| 別デバイス（スマホ等） | WSL2のTailscale IP |

## Usage

スマートフォンのSSHアプリから接続したら：

```bash
# Claude Codeを起動
claude

# または既存セッションを再開
claude --resume
```

モバイル画面は狭いので、tmuxと組み合わせると便利：

```bash
# セッションを作成
tmux new -s claude

# 後で再接続
tmux attach -t claude
```

## Network Diagram

```
スマートフォン (Tailscale)
  │
  │  100.x.x.x ネットワーク（インターネット経由で暗号化）
  ▼
WSL2 (Tailscale: 100.x.x.x)
  │
  │  SSH (port 22)
  ▼
Claude Code
```

## Why This Matters

- **場所を選ばない** - 外出先からでも自宅のClaude Codeにアクセス
- **セットアップ不要のVPN** - Tailscaleはルーター設定やポート開放が不要
- **無料で使える** - 個人利用なら十分な無料枠

## Troubleshooting

### pingが通らない

同じPC上でWindowsとWSL2の両方にTailscaleがある場合、ルーティングが競合する。別デバイスからの接続には問題ないが、同じPC上のWindowsからWSL2のTailscale IPには接続できない。

### SSHが接続できない

```bash
# SSHサーバーの状態を確認
systemctl status ssh

# ポート22でリッスンしているか確認
ss -tlnp | grep :22

# Tailscaleの状態を確認
tailscale status
```

## See Also

- [Tip 45: Run PowerShell from WSL2](./tip-45.md) - WSL2からWindowsを操作
- [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md) - WSL2でのブラウザ自動化
