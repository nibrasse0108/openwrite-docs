# Basic Usage

This page covers the most common patterns for integrating OpenWrite into a React application.

## Controlled mode

The recommended approach is controlled mode: you own the HTML string in React state, and OpenWrite calls `onChange` whenever the content changes. This mirrors how standard `<input>` elements work.

```tsx
import { useState } from 'react'
import { OpenWrite } from 'openwrite'
import 'openwrite/styles'

export default function ControlledEditor() {
  const [html, setHtml] = useState('<p>Start writing…</p>')

  return (
    <div>
      <OpenWrite
        value={html}
        onChange={setHtml}
        minHeight={300}
        placeholder="Write something…"
      />

      {/* Preview the raw HTML */}
      <pre style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
        {html}
      </pre>
    </div>
  )
}
```

::: tip onChange frequency
`onChange` is debounced internally. It fires after the user stops typing for ~300 ms to avoid re-rendering on every keystroke. The value is always a valid HTML string.
:::

## Uncontrolled mode

If you only need the content at submit time and do not need to react to every change, use `defaultValue` instead of `value`. Pair it with an `EditorRef` to read the HTML on demand.

```tsx
import { useRef } from 'react'
import { OpenWrite, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function UncontrolledEditor() {
  const editorRef = useRef<EditorRef>(null)

  function handleSubmit() {
    const html = editorRef.current?.getHTML() ?? ''
    console.log('Submitting:', html)
    // send html to your API…
  }

  return (
    <div>
      <OpenWrite
        ref={editorRef}
        defaultValue="<p>Edit this content.</p>"
        minHeight={300}
      />
      <button onClick={handleSubmit} style={{ marginTop: '0.5rem' }}>
        Submit
      </button>
    </div>
  )
}
```

::: warning Mixing value and defaultValue
Do not pass both `value` and `defaultValue` at the same time. If `value` is provided, the editor is fully controlled and `defaultValue` is ignored.
:::

## Read-only mode

Set `readOnly` to `true` to render the editor content without any editing capability. The toolbar and floating toolbar are hidden automatically.

```tsx
<OpenWrite
  value="<p>This content cannot be edited.</p>"
  readOnly
  minHeight={200}
/>
```

Read-only mode is useful for displaying user-submitted content in a preview panel or detail view while keeping the same styling as the edit view.

## Placeholder

Use the `placeholder` prop to show hint text when the editor is empty:

```tsx
<OpenWrite
  placeholder="Describe your project…"
  minHeight={200}
  onChange={setHtml}
/>
```

The placeholder disappears as soon as the user starts typing, exactly like a native `<input>` or `<textarea>` placeholder.

## autoFocus

Set `autoFocus` to move the cursor into the editor immediately when it mounts:

```tsx
<OpenWrite
  autoFocus
  placeholder="Start typing to search…"
  minHeight={150}
  onChange={setHtml}
/>
```

::: warning autoFocus and Next.js
In a server-rendered Next.js application, make sure the editor component is client-side only (see the [Next.js guide](/guide/nextjs)) before using `autoFocus` to avoid hydration mismatches.
:::

## Focus and blur events

Listen for focus and blur to track whether the editor is active:

```tsx
import { useState } from 'react'
import { OpenWrite } from 'openwrite'
import 'openwrite/styles'

export default function FocusExample() {
  const [focused, setFocused] = useState(false)

  return (
    <div
      style={{
        border: `2px solid ${focused ? '#2563eb' : '#e5e7eb'}`,
        borderRadius: '8px',
        transition: 'border-color 0.2s',
      }}
    >
      <OpenWrite
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Click to focus…"
        minHeight={200}
        onChange={() => {}}
      />
    </div>
  )
}
```

## Limiting height

Use `minHeight` and `maxHeight` (in pixels) to control the editor's vertical size. When content exceeds `maxHeight`, the editor becomes scrollable:

```tsx
<OpenWrite
  minHeight={200}
  maxHeight={600}
  onChange={setHtml}
/>
```

## Spell check

Browser spell-checking is disabled by default to avoid false positives in code blocks. Enable it with:

```tsx
<OpenWrite spellCheck onChange={setHtml} />
```

## Custom class names

Apply custom CSS classes to the outer wrapper and to the editable content area independently:

```tsx
<OpenWrite
  className="my-editor-wrapper"
  contentClassName="my-editor-content prose prose-lg"
  onChange={setHtml}
/>
```

`className` targets the outermost container (toolbar + content area). `contentClassName` targets only the `contenteditable` region — useful for applying Tailwind Typography or your own prose styles.
