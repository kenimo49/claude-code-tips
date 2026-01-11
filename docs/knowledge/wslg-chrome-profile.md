# WSLg Chrome Profile

WSLg上で動作するGoogle Chromeのプロファイル管理について。

## プロファイルの保存場所

WSLg上のChromeプロファイルは以下に保存される：

```
~/.config/google-chrome/
```

Windows版Chromeとは完全に別の場所：

| 環境 | プロファイルの場所 |
|------|-------------------|
| Windows | `C:\Users\<username>\AppData\Local\Google\Chrome\User Data\` |
| WSLg (Linux) | `~/.config/google-chrome/` |

## プロファイルの構成

```
~/.config/google-chrome/
├── Default/          # 最初のプロファイル
├── Profile 1/        # 2番目のプロファイル
├── Profile 2/        # 3番目のプロファイル
├── Local State       # 全体の設定ファイル
└── ...
```

各プロファイルフォルダには以下が含まれる：
- ブックマーク
- 拡張機能
- ログイン状態（Googleアカウント等）
- Cookie、履歴
- 設定

## 新しいプロファイルの作成方法

1. Chromeを起動
2. 右上のプロファイルアイコン（人型またはアバター）をクリック
3. 「追加」または「他のプロファイル」→「追加」を選択
4. プロファイル名を入力して作成

作成されたプロファイルは `~/.config/google-chrome/Profile N/` として保存される。

## Claude in Chromeでの活用

プロファイルを分けることで：

- **普段使い用**: メインのGoogleアカウント、普段の拡張機能
- **自動化用**: Claude in Chrome専用、最小限の拡張機能

のように環境を分離できる。

### 特定のプロファイルでChromeを起動

```bash
# デフォルトプロファイル
google-chrome &

# 特定のプロファイルを指定
google-chrome --profile-directory="Profile 1" &
```

## 注意事項

- Windows版ChromeとWSLg版Chromeでプロファイルは共有されない
- 拡張機能は各環境で別途インストールが必要
- Googleアカウントでの同期を使えばブックマーク等は共有可能
