# EditorRef

`EditorRef` provides an imperative API for reading and mutating the editor from outside React's prop/state flow. Attach it using React's `useRef` hook.

## Import

```ts
import type { EditorRef } from 'openwrite'
```

## Setup

```tsx
import { useRef } from 'react'
import { OpenWrite, type EditorRef } from 'openwrite'

export default function MyComponent() {
  const editorRef = useRef<EditorRef>(null)

  return <OpenWrite ref={editorRef} onChange={() => {}} />
}
```

::: warning Null check
`editorRef.current` is `null` before the component mounts and after it unmounts. Always perform a null check before calling any method:

```ts
editorRef.current?.getHTML()
// or
if (editorRef.current) {
  editorRef.current.setHTML('<p>New content</p>')
}
```
:::

## Methods

### `getHTML(): string`

Returns the current HTML content of the editor as a string.

```ts
const html = editorRef.current?.getHTML() ?? ''
```

The returned string is a valid HTML fragment (typically starting with a `<p>` tag). Empty editors return an empty string or `'<p><br></p>'` depending on the browser.

---

### `setHTML(html: string): void`

Replaces the entire editor content with the provided HTML string. This is equivalent to changing the `value` prop but done imperatively.

```ts
editorRef.current?.setHTML('<h1>New document</h1><p>Fresh content.</p>')
```

::: tip setHTML vs value
If the editor is in controlled mode (`value` prop is set), prefer updating your state variable instead of calling `setHTML` — otherwise the next render will overwrite the imperatively set content. Use `setHTML` primarily in uncontrolled mode.
:::

---

### `focus(): void`

Moves focus into the editor's content area, positioning the cursor at its last known position.

```ts
editorRef.current?.focus()
```

Useful when the user completes an action (e.g. closes a dialog) and you want to return focus to the editor.

---

### `blur(): void`

Removes focus from the editor.

```ts
editorRef.current?.blur()
```

---

### `clear(): void`

Clears all content from the editor, leaving it empty. Equivalent to `setHTML('')` but more semantically explicit.

```ts
editorRef.current?.clear()
```

After calling `clear()`, `getHTML()` returns an empty string and the editor shows its placeholder (if one is configured).

---

### `execCommand(command: string, value?: string): void`

Executes a named formatting command on the editor's current selection. This is the low-level escape hatch for running commands that are not exposed through built-in toolbar items or the plugin API.

```ts
// Bold the current selection
editorRef.current?.execCommand('bold')

// Set the font color of the selection
editorRef.current?.execCommand('foreColor', '#2563eb')

// Insert HTML at the cursor
editorRef.current?.execCommand('insertHTML', '<mark>highlighted text</mark>')
```

The command names are the same as `document.execCommand` command names, plus OpenWrite's own internal commands (which mirror the built-in toolbar keys).

::: warning Selection required
Many formatting commands (bold, foreColor, etc.) require an active text selection to have any effect. If there is no selection, the command may apply to text typed next or have no visible effect.
:::

## Complete reference

```ts
interface EditorRef {
  /** Returns the editor's current HTML content. */
  getHTML(): string

  /** Replaces the editor's content with the given HTML string. */
  setHTML(html: string): void

  /** Moves focus into the editor. */
  focus(): void

  /** Removes focus from the editor. */
  blur(): void

  /** Clears all editor content. */
  clear(): void

  /** Executes a formatting command on the current selection. */
  execCommand(command: string, value?: string): void
}
```

## Usage examples

### Save on keyboard shortcut

```tsx
import { useRef, useEffect } from 'react'
import { OpenWrite, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function EditorWithSave() {
  const editorRef = useRef<EditorRef>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        const html = editorRef.current?.getHTML() ?? ''
        console.log('Saving:', html)
        // call your API here
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return <OpenWrite ref={editorRef} defaultValue="<p>Press Ctrl+S to save.</p>" onChange={() => {}} />
}
```

### Insert content from outside the editor

```tsx
function insertSignature() {
  editorRef.current?.execCommand(
    'insertHTML',
    '<p>—<br><strong>Jane Doe</strong><br>jane@example.com</p>'
  )
  editorRef.current?.focus()
}
```

### Reset the editor

```tsx
function resetEditor() {
  editorRef.current?.clear()
  editorRef.current?.focus()
}
```
