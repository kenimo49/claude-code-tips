# Tip 45: Execute PowerShell commands from WSL2

> WSL2からPowerShellコマンドを実行する

**Category**: Automation
**Related**: [Tip 36: Background execution](./tip-36.md), [Tip 41: Automate automation](./tip-41.md)

## Overview

WSL2上でClaude Codeを動かしている場合、`powershell.exe`を直接呼び出してWindows側の機能を利用できる。Hooksと組み合わせると特に便利。

## Sound Notification Example

作業完了時に音を鳴らす設定。

`~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -NoProfile -Command \"[console]::beep(600, 300)\""
          }
        ]
      }
    ]
  }
}
```

| 設定 | 説明 |
|-----|------|
| Stop | Claudeが応答を完了した時に発火 |
| -NoProfile | PowerShellの起動を高速化 |
| beep(周波数Hz, 長さms) | 音をカスタマイズ可能 |

**注意**: `/hooks`コマンドにはStopは表示されないが、動作する。設定変更後はClaude Codeの再起動が必要。

## Troubleshooting

音が鳴らない場合は、デバッグモードで確認：

```bash
claude --debug hooks
```

hooksの動作状況、設定ファイルの構文エラー、正しく読み込まれているかをチェックできる。

## MP3 File Playback

PowerShellスクリプトでmp3を再生できる。

`play_finish.ps1`:
```powershell
Add-Type -AssemblyName presentationCore
$player = New-Object System.Windows.Media.MediaPlayer
$player.Open('D:\WSL\claude_tools\sound\finish.mp3')
$player.Play()
Start-Sleep -Seconds 2
```

`~/.claude/settings.json`:
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -NoProfile -ExecutionPolicy Bypass -File 'D:\\WSL\\claude_tools\\sound\\play_finish.ps1'"
          }
        ]
      }
    ]
  }
}
```

## Other Use Cases

```bash
# Windows通知を表示
powershell.exe -Command "New-BurntToastNotification -Text 'Claude完了'"

# クリップボードにコピー
powershell.exe -Command "Set-Clipboard 'テキスト'"

# Windowsアプリを起動
powershell.exe -Command "Start-Process notepad"
```

## Why This Matters

- WSL2とWindowsの連携でClaude Codeの自動化の幅が広がる
- 音による通知で離席中も作業完了を把握できる
- Windows側のツールやAPIを活用可能

## See Also

- [Tip 36: Background execution](./tip-36.md) - バックグラウンド実行
- [Tip 41: Automate automation](./tip-41.md) - 自動化の自動化
