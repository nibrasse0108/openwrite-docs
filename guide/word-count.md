# Word Count

OpenWrite provides two ways to display word and character counts: the built-in `showWordCount` prop and the standalone `<WordCount>` component.

## Using the `showWordCount` prop

The simplest approach is to set `showWordCount` on the editor. This renders a word and character count bar in the editor's footer area:

```tsx
<OpenWrite
  value={html}
  onChange={setHtml}
  showWordCount
  minHeight={300}
/>
```

The count updates in real time as the user types.

## Standalone `<WordCount>` component

If you want to display the count in a custom location — for example in a sidebar, a status bar, or above the editor — use the exported `<WordCount>` component:

```tsx
import { useState } from 'react'
import { OpenWrite, WordCount, type EditorTheme } from 'openwrite'
import 'openwrite/styles'

export default function EditorWithExternalCount() {
  const [html, setHtml] = useState('')
  const theme: EditorTheme = 'light'

  return (
    <div>
      {/* Editor without the built-in footer */}
      <OpenWrite
        value={html}
        onChange={setHtml}
        theme={theme}
        minHeight={300}
      />

      {/* Custom count display */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <WordCount html={html} theme={theme} />
      </div>
    </div>
  )
}
```

### `WordCount` props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `html` | `string` | Yes | The HTML string to count words in. Pass the same value you get from `onChange`. |
| `theme` | `'light' \| 'dark'` | No | Matches the editor theme for consistent styling. Defaults to `'light'`. |

## What is counted?

- **Words** — sequences of non-whitespace characters separated by whitespace, after stripping HTML tags. Punctuation attached to words is included in the word (e.g. "don't" counts as one word).
- **Characters** — all visible characters after stripping HTML tags, including spaces and punctuation.

::: tip Performance
`WordCount` memoises its computation with `useMemo`. Passing a stable `html` reference (e.g. from React state) avoids unnecessary recalculations.
:::

## Example: word limit

Use `WordCount` together with controlled state to enforce a word limit:

```tsx
import { useState, useMemo } from 'react'
import { OpenWrite, WordCount } from 'openwrite'
import 'openwrite/styles'

function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').trim()
  return text ? text.split(/\s+/).length : 0
}

const WORD_LIMIT = 500

export default function LimitedEditor() {
  const [html, setHtml] = useState('')
  const words = useMemo(() => countWords(html), [html])
  const over = words > WORD_LIMIT

  return (
    <div>
      <OpenWrite
        value={html}
        onChange={setHtml}
        minHeight={300}
        contentClassName={over ? 'editor-over-limit' : ''}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0.25rem',
          color: over ? '#dc2626' : undefined,
          fontWeight: over ? 600 : undefined,
        }}
      >
        <WordCount html={html} />
        {over && <span style={{ marginLeft: '0.5rem' }}>— over limit!</span>}
      </div>
    </div>
  )
}
```
