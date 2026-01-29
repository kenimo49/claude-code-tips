# Tip 58: Use Chrome Fake Camera for Browser Automation

> ブラウザ自動化テストでフェイクカメラを使用する

**Category**: Browser Automation
**Related**: [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md)

## Overview

Claude in Chrome でカメラやマイクを使用するWebアプリをテストする際、物理デバイスがなくても Chrome の Fake Media Device 機能を使ってテストできる。これにより、WebRTCアプリケーションのメモリリークテストやE2Eテストが可能になる。

## Chrome Fake Media Device Flags

### 基本的な起動コマンド

```bash
google-chrome --use-fake-device-for-media-stream --use-fake-ui-for-media-stream
```

### フラグの説明

| フラグ | 説明 |
|--------|------|
| `--use-fake-device-for-media-stream` | 物理カメラ/マイクの代わりにテスト用の偽デバイスを使用。動くカラーバーの映像とテストトーンの音声が生成される |
| `--use-fake-ui-for-media-stream` | カメラ/マイクの権限ダイアログを自動承認。ユーザー操作なしでメディアデバイスにアクセス可能 |

## Platform-Specific Commands

### Linux / WSL2

```bash
google-chrome --use-fake-device-for-media-stream --use-fake-ui-for-media-stream
```

### macOS

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --use-fake-device-for-media-stream \
  --use-fake-ui-for-media-stream
```

### Windows

```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --use-fake-device-for-media-stream ^
  --use-fake-ui-for-media-stream
```

## Advanced: Custom Video File

特定の動画ファイルをカメラ入力として使用することも可能：

```bash
google-chrome \
  --use-fake-device-for-media-stream \
  --use-fake-ui-for-media-stream \
  --use-file-for-fake-video-capture=/path/to/video.y4m
```

**注意**: Y4M形式の動画ファイルが必要。MP4から変換する場合：

```bash
ffmpeg -i input.mp4 -pix_fmt yuv420p output.y4m
```

## Important Notes

### 既存のChromeプロセスに注意

フラグは Chrome 起動時にのみ有効。既に Chrome が起動している場合は、一度完全に終了してから再起動する必要がある：

```bash
# 全Chromeプロセスを終了
pkill -f chrome

# フラグ付きで起動
google-chrome --use-fake-device-for-media-stream --use-fake-ui-for-media-stream
```

### プロファイルとの併用

特定のプロファイルを使用する場合：

```bash
google-chrome \
  --profile-directory="Profile 1" \
  --use-fake-device-for-media-stream \
  --use-fake-ui-for-media-stream
```

## Use Cases

### 1. WebRTCアプリのメモリリークテスト

カメラを使用するビデオ通話アプリで、繰り返しテストを自動実行してメモリリークを検出：

```javascript
// メモリ計測スニペット
performance.memory ? {
  usedJSHeapSize: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB'
} : 'Memory API not available'
```

### 2. E2Eテストの自動化

CI/CD環境でカメラ権限ダイアログなしにテストを実行。

### 3. 開発中のデバッグ

物理カメラが他のアプリで使用中でも、フェイクカメラでテスト可能。

## Fake Media Device Output

フェイクカメラは以下のテストパターンを出力：
- **映像**: 動くカラーバー（緑色の背景に時刻表示）
- **音声**: テストトーン

これにより、映像/音声が正常に処理されているか視覚的に確認できる。

## Why This Matters

- **環境依存なし**: 物理デバイスがなくてもテスト可能
- **自動化対応**: ダイアログなしでCI/CDに組み込める
- **再現性**: 毎回同じ入力でテストできる
- **並列テスト**: 複数のテストが同時にカメラを使用可能

## See Also

- [Tip 46: Use Claude in Chrome from WSL2](./tip-46.md) - WSL2でのClaude in Chrome基本設定
- [Chrome Command Line Switches](https://peter.sh/experiments/chromium-command-line-switches/) - 全フラグ一覧
