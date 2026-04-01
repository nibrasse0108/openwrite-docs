# Installation

## Package managers

Install OpenWrite using your preferred package manager:

::: code-group

```bash [npm]
npm install openwrite
```

```bash [yarn]
yarn add openwrite
```

```bash [pnpm]
pnpm add openwrite
```

:::

## Peer dependencies

OpenWrite requires **React 18 or later**. If your project does not already have React installed, add it alongside OpenWrite:

::: code-group

```bash [npm]
npm install openwrite react react-dom
```

```bash [yarn]
yarn add openwrite react react-dom
```

```bash [pnpm]
pnpm add openwrite react react-dom
```

:::

::: warning React version
OpenWrite uses React 18 concurrent features internally. React 17 and earlier are **not** supported.
:::

## Importing the stylesheet

OpenWrite ships its own CSS. You must import it once — typically at the root of your application — before rendering any `<OpenWrite>` component:

```ts
import 'openwrite/styles'
```

### With Next.js

In a Next.js App Router project, add the import to your root `layout.tsx`:

```tsx
// app/layout.tsx
import 'openwrite/styles'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

In a Pages Router project, add it to `_app.tsx`:

```tsx
// pages/_app.tsx
import 'openwrite/styles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

## TypeScript

OpenWrite is written in TypeScript and ships its own type declarations — no `@types/` package is needed. All public interfaces (`EditorProps`, `EditorRef`, `OpenWritePlugin`, `EditorLocale`, etc.) are exported from the main entry point:

```ts
import type {
  EditorRef,
  EditorProps,
  OpenWritePlugin,
  EditorLocale,
  ToolbarConfig,
} from 'openwrite'
```

::: tip tsconfig
Make sure your `tsconfig.json` targets at least `"moduleResolution": "bundler"` or `"moduleResolution": "node16"` so that the package exports map resolves correctly.
:::

## Verifying the installation

After installing, render a minimal editor to confirm everything works:

```tsx
// src/App.tsx
import { OpenWrite } from 'openwrite'
import 'openwrite/styles'

export default function App() {
  return <OpenWrite defaultValue="<p>It works!</p>" minHeight={200} />
}
```

If the editor renders with its toolbar, you are good to go. Proceed to [Basic Usage](/guide/basic-usage) to learn how to wire up state and events.
