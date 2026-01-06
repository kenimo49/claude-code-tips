# Tip 6: Getting output out of your terminal

> Claude Codeの出力をターミナルから取り出す方法

**Category**: Output
**Related**: [Tip 10: Cmd+A and Ctrl+A](./tip-10.md), [Tip 19: Markdown](./tip-19.md)

## Overview

ターミナルから直接コピーすると綺麗にならないことがある。より良い方法がいくつかある。

## Methods

### Clipboard (pbcopy)

Mac/Linuxでは`pbcopy`でクリップボードに直接送信：

```
> 結果をpbcopyでクリップボードにコピーして
```

### Write to File

ファイルに書き出してエディタで開く：

```
> 結果をoutput.mdに書いて、VS Codeで開いて
```

特定の行番号を指定して開くこともできる。

### Open URLs

URLをブラウザで開く：

```
> このURLをブラウザで開いて
```

Macでは`open`コマンドが使われる。

### GitHub Desktop

リポジトリをGitHub Desktopで開く（特にworktreeで作業中に便利）：

```
> このリポジトリをGitHub Desktopで開いて
```

## Combining Methods

GitHub PR説明文の編集例：
1. PR内容をローカルファイルにコピー
2. Claude Codeに編集させる
3. 結果を確認
4. `pbcopy`でクリップボードにコピー、または直接PRに反映

## See Also

- [Tip 10: Cmd+A and Ctrl+A](./tip-10.md) - コンテンツの取り込み
- [Tip 19: Markdown](./tip-19.md) - Markdownの活用
