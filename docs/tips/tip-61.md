# Tip 61: Use error boundaries to prevent crashes

> エラーバウンダリでクラッシュを防ぐ

**Category**: React
**Related**: [Tip 62: Validate inputs with Zod schemas](./tip-62.md)

## Overview

React の ErrorBoundary を使用して、コンポーネントのエラーをキャッチし、アプリ全体のクラッシュを防ぐ。ユーザーフレンドリーなフォールバック UI を表示する。

## Basic Error Boundary

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // エラー報告サービスに送信
    // reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h2>エラーが発生しました</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            再試行
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Usage

```tsx
// アプリ全体をラップ
<ErrorBoundary fallback={<FullPageError />}>
  <App />
</ErrorBoundary>

// 特定のセクションをラップ
<ErrorBoundary fallback={<WidgetError />}>
  <Dashboard />
</ErrorBoundary>
```

## Granular Error Boundaries

```tsx
function App() {
  return (
    <div>
      <Header /> {/* エラーでもヘッダーは表示 */}

      <ErrorBoundary fallback={<SidebarFallback />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<MainContentFallback />}>
        <MainContent />
      </ErrorBoundary>

      <Footer /> {/* エラーでもフッターは表示 */}
    </div>
  );
}
```

## react-error-boundary Library

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>エラーが発生しました:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>再試行</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => {
    // 状態をリセット
  }}
  onError={(error, info) => {
    // エラーをログ
  }}
>
  <MyComponent />
</ErrorBoundary>
```

## What Error Boundaries Don't Catch

- イベントハンドラ内のエラー
- 非同期コード（setTimeout など）
- サーバーサイドレンダリング
- エラーバウンダリ自身のエラー

これらは `try-catch` で個別に処理する。

## Context Engineering Benefits

Claude Code でのコンテキスト管理・探索効率への貢献：

- **問題調査スコープの縮小**: エラーの影響範囲が限定されるため、デバッグ時の探索対象が明確
- **構造化されたエラー情報**: componentDidCatch で収集した情報が問題特定を効率化
- **段階的な問題切り分け**: 粒度の細かい ErrorBoundary により、問題箇所の特定が容易

## Why This Matters

- アプリ全体のクラッシュを防げる
- ユーザーに適切なフィードバックを表示できる
- エラーの影響範囲を限定できる

## See Also

- [Tip 62: Validate inputs with Zod schemas](./tip-62.md) - 入力検証
