# EditorProps

Complete reference for all props accepted by the `<OpenWrite>` component.

## Import

```ts
import type { EditorProps } from 'openwrite'
```

## Props table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled HTML content. When provided, the editor is in controlled mode and will reflect this value. Pair with `onChange`. |
| `defaultValue` | `string` | `''` | Uncontrolled initial HTML content. The editor manages its own state after mount. Do not use together with `value`. |
| `onChange` | `(html: string) => void` | — | Called with the current HTML string whenever the content changes. Debounced internally (~300 ms). |
| `onFocus` | `() => void` | — | Called when the editor gains focus. |
| `onBlur` | `() => void` | — | Called when the editor loses focus. |
| `placeholder` | `string` | `''` | Placeholder text shown when the editor is empty. Behaves like a native input placeholder. |
| `minHeight` | `number` | `200` | Minimum height of the editable content area in pixels. The editor grows beyond this as content is added. |
| `maxHeight` | `number` | — | Maximum height of the content area in pixels. The area becomes scrollable when content exceeds this height. |
| `theme` | `'light' \| 'dark'` | `'light'` | Color scheme of the editor. See [Themes](/guide/theming). |
| `readOnly` | `boolean` | `false` | When `true`, the editor is non-editable. The toolbar and floating toolbar are hidden. |
| `spellCheck` | `boolean` | `false` | Enables or disables browser spell-checking on the content area. |
| `toolbar` | `ToolbarConfig` | `DEFAULT_TOOLBAR` | Configures the toolbar as an array of groups. Each group is an array of toolbar item keys. See [Toolbar](/guide/toolbar). |
| `plugins` | `OpenWritePlugin[]` | `[]` | Array of plugins that contribute custom toolbar items and commands. See [Plugin System](/guide/plugins). |
| `locale` | `'fr' \| 'en' \| EditorLocale \| Partial<EditorLocale>` | `'en'` | Locale for the editor UI (toolbar tooltips, dialog labels, placeholder). See [i18n](/guide/i18n). |
| `onImageUpload` | `(file: File) => Promise<string>` | — | Async function called when the user inserts an image from their device. Should upload the file and return a public URL. If not provided, images are embedded as base64 data URIs. |
| `floatingToolbar` | `boolean` | `false` | When `true`, a bubble toolbar appears on text selection. See [Floating Toolbar](/guide/floating-toolbar). |
| `showWordCount` | `boolean` | `false` | When `true`, a word and character count is shown in the editor footer. |
| `className` | `string` | — | Additional CSS class names applied to the outermost wrapper element (toolbar + content area). |
| `contentClassName` | `string` | — | Additional CSS class names applied to the editable content `<div>` only. |
| `autoFocus` | `boolean` | `false` | When `true`, the editor receives focus immediately after mount. |

## Detailed descriptions

### `value` and `onChange` — Controlled mode

```tsx
const [html, setHtml] = useState('<p>Initial content</p>')

<OpenWrite value={html} onChange={setHtml} />
```

The `value` prop keeps the editor in sync with external state. Every time React re-renders with a new `value`, the editor updates its content. `onChange` fires whenever the user modifies the content, giving you the updated HTML string.

### `defaultValue` — Uncontrolled mode

```tsx
<OpenWrite defaultValue="<p>Initial content</p>" />
```

`defaultValue` is only read once on mount. After that, the editor manages its own internal state. Use an `EditorRef` to read the current HTML on demand.

### `onImageUpload`

Without `onImageUpload`, inserted images are stored as base64 data URIs in the HTML, which can make the HTML string very large. Provide `onImageUpload` to store images on your server:

```tsx
async function handleImageUpload(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const { url } = await res.json()
  return url
}

<OpenWrite onImageUpload={handleImageUpload} onChange={setHtml} />
```

### `toolbar`

See the full [Toolbar guide](/guide/toolbar) and [Toolbar Config API reference](/api/toolbar-config).

```tsx
<OpenWrite
  toolbar={[
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ]}
  onChange={setHtml}
/>
```

### `plugins`

See the [Plugin System guide](/guide/plugins) and [Plugin System API reference](/api/plugin-system).

```tsx
<OpenWrite plugins={[myPlugin]} onChange={setHtml} />
```

## TypeScript signature

```ts
interface EditorProps {
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  theme?: 'light' | 'dark'
  readOnly?: boolean
  spellCheck?: boolean
  toolbar?: ToolbarConfig
  plugins?: OpenWritePlugin[]
  locale?: 'fr' | 'en' | EditorLocale | Partial<EditorLocale>
  onImageUpload?: (file: File) => Promise<string>
  floatingToolbar?: boolean
  showWordCount?: boolean
  className?: string
  contentClassName?: string
  autoFocus?: boolean
}
```
