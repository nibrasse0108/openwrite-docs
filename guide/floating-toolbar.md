# Floating Toolbar

The floating toolbar is a contextual bubble that appears directly above a text selection, giving users quick access to the most common formatting actions without moving their eyes to the main toolbar.

## Enabling the floating toolbar

Set the `floatingToolbar` prop to `true`:

```tsx
<OpenWrite
  floatingToolbar
  onChange={setHtml}
/>
```

The floating toolbar is **disabled by default** (`floatingToolbar={false}`).

## How it works

When `floatingToolbar` is enabled and the user selects one or more characters of text, a compact toolbar bubble pops up near the selection. The bubble contains a curated subset of formatting actions:

- **Bold**, **Italic**, **Underline**, **Strikethrough**
- **Link** (insert or edit)
- **Remove Link**
- **Text Color**, **Background Color**
- **Clear Format**

The bubble repositions itself automatically to stay within the viewport boundaries. It disappears when the selection is collapsed (cursor only) or when the editor loses focus.

## Example: distraction-free editor

The floating toolbar pairs especially well with a stripped-down main toolbar for a distraction-free writing experience:

```tsx
import { useState } from 'react'
import { OpenWrite } from 'openwrite'
import 'openwrite/styles'

export default function DistractionFreeEditor() {
  const [html, setHtml] = useState('')

  return (
    <OpenWrite
      value={html}
      onChange={setHtml}
      // Minimal main toolbar — just undo/redo and structural items
      toolbar={[
        ['undo', 'redo'],
        ['heading'],
        ['bulletList', 'orderedList'],
        ['link', 'image'],
        ['fullscreen'],
      ]}
      // Rich floating toolbar for inline formatting
      floatingToolbar
      minHeight={500}
      placeholder="Start writing. Select text to format it."
    />
  )
}
```

## Combining with the main toolbar

The floating toolbar does not replace the main toolbar — both are active simultaneously when `floatingToolbar` is `true`. You can use them together to keep the main toolbar focused on block-level and structural operations while the floating toolbar handles inline formatting.

::: tip Mobile considerations
On touch devices, the floating toolbar appears after the user lifts their finger from a text selection, following the browser's native selection behaviour. Test on real devices to ensure the bubble does not overlap the operating system's native selection handles.
:::

## Accessibility

The floating toolbar is fully keyboard-accessible. When text is selected:

- Press **Tab** to move focus into the floating toolbar.
- Use **Arrow keys** to navigate between toolbar buttons.
- Press **Enter** or **Space** to activate a button.
- Press **Escape** to dismiss the toolbar and return focus to the editor.
