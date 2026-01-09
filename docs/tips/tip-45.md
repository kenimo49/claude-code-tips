# Tip 45: Execute PowerShell commands from WSL2

> WSL2からPowerShellコマンドを実行する

**Category**: Automation
**Related**: [Tip 36: Background execution](./tip-36.md), [Tip 41: Automate automation](./tip-41.md)

## Overview

WSL2上でClaude Codeを動かしている場合、`powershell.exe`を直接呼び出してWindows側の機能を利用できる。Hooksと組み合わせると特に便利。

## Sound Notification Example

作業完了時やask時に音を鳴らす設定。

`~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"[console]::beep(1000, 300)\""
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -Command \"[console]::beep(600, 300)\""
          }
        ]
      }
    ]
  }
}
```

| イベント | 音 |
|---------|-----|
| Stop（作業完了時） | 高い音（1000Hz） |
| Notification（ask時） | 低い音（600Hz） |

周波数と長さ（ミリ秒）を調整して好みの音にカスタマイズ可能。

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
