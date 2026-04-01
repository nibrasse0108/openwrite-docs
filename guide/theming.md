# Themes

OpenWrite ships with built-in support for light and dark modes, controlled entirely through the `theme` prop. No extra CSS variables or class name tricks are required.

## The `theme` prop

```tsx
<OpenWrite theme="light" onChange={setHtml} />
<OpenWrite theme="dark"  onChange={setHtml} />
```

| Value | Description |
|-------|-------------|
| `"light"` | Light background, dark text (default) |
| `"dark"` | Dark background, light text |

When `theme` is not provided, the editor defaults to `"light"`.

## Syncing with your app's theme

If your application manages a global theme (e.g. via a context or a `dark` class on `<html>`), pass the current theme value down as a prop:

```tsx
import { useState } from 'react'
import { OpenWrite, type EditorTheme } from 'openwrite'
import 'openwrite/styles'

export default function ThemedEditor() {
  const [theme, setTheme] = useState<EditorTheme>('light')
  const [html, setHtml]   = useState('')

  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle theme (current: {theme})
      </button>

      <OpenWrite
        theme={theme}
        value={html}
        onChange={setHtml}
        minHeight={400}
      />
    </div>
  )
}
```

::: tip Tailwind dark mode
If you are using Tailwind's `class`-based dark mode strategy, you can read the current mode from the DOM and pass it to the editor:

```tsx
const isDark = document.documentElement.classList.contains('dark')
<OpenWrite theme={isDark ? 'dark' : 'light'} onChange={setHtml} />
```

Or, use a custom hook that observes the `dark` class so the editor re-renders when the user switches themes.
:::

## Controlling size

### minHeight

Sets the minimum height of the editable content area in pixels. The editor grows beyond this value as the user adds more content.

```tsx
<OpenWrite minHeight={200} onChange={setHtml} />
```

### maxHeight

Sets the maximum height of the content area. When the content exceeds this height, the area becomes scrollable internally. The toolbar remains visible above the scroll area.

```tsx
<OpenWrite minHeight={200} maxHeight={600} onChange={setHtml} />
```

### Combined example

```tsx
<OpenWrite
  minHeight={300}
  maxHeight={800}
  theme="dark"
  onChange={setHtml}
/>
```

## Custom class names

### `className`

Applied to the **outermost wrapper** `<div>` that contains both the toolbar and the editable area. Use this to control the overall layout, border, border-radius, or shadow.

```tsx
<OpenWrite
  className="rounded-xl border border-gray-200 shadow-sm"
  onChange={setHtml}
/>
```

### `contentClassName`

Applied to the inner **editable content** `<div>` only. This is where you would inject Tailwind Typography (`prose`) or your own paragraph/heading styles.

```tsx
<OpenWrite
  contentClassName="prose prose-lg dark:prose-invert max-w-none"
  onChange={setHtml}
/>
```

### Full styling example

```tsx
<OpenWrite
  theme="dark"
  className="rounded-2xl border border-zinc-700 shadow-xl overflow-hidden"
  contentClassName="font-serif text-base leading-relaxed"
  minHeight={400}
  maxHeight={800}
  onChange={setHtml}
/>
```

::: warning contentClassName and editor styles
Be careful with `contentClassName` — aggressive CSS resets applied here can interfere with the editor's internal formatting. Prefer additive styles (font, line-height, spacing) over resets that target `*` or `all: unset`.
:::
