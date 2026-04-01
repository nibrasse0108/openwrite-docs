# Toolbar Config

Complete reference for the toolbar configuration types and the built-in toolbar items.

## Import

```ts
import type {
  ToolbarConfig,
  ToolbarGroup,
  ToolbarItem,
  BuiltinToolbarKey,
} from 'openwrite'

import { DEFAULT_TOOLBAR } from 'openwrite'
```

## Type definitions

### `BuiltinToolbarKey`

A string literal union of all built-in toolbar item keys:

```ts
type BuiltinToolbarKey =
  | 'undo'
  | 'redo'
  | 'heading'
  | 'fontFamily'
  | 'fontSize'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'subscript'
  | 'superscript'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'bulletList'
  | 'orderedList'
  | 'indent'
  | 'outdent'
  | 'link'
  | 'removeLink'
  | 'image'
  | 'table'
  | 'blockquote'
  | 'codeBlock'
  | 'inlineCode'
  | 'hr'
  | 'emoji'
  | 'specialChars'
  | 'textColor'
  | 'backgroundColor'
  | 'clearFormat'
  | 'findReplace'
  | 'fullscreen'
  | 'sourceView'
  | 'print'
  | 'importWord'
  | 'exportWord'
  | 'exportPdf'
```

### `ToolbarItem`

A single item in a toolbar group. Can be a built-in key or a plugin-registered custom key:

```ts
type ToolbarItem = BuiltinToolbarKey | string
```

### `ToolbarGroup`

An ordered array of toolbar items. Groups are visually separated by a divider in the toolbar:

```ts
type ToolbarGroup = ToolbarItem[]
```

### `ToolbarConfig`

The top-level toolbar configuration — an array of groups:

```ts
type ToolbarConfig = ToolbarGroup[]
```

## `DEFAULT_TOOLBAR`

The toolbar configuration used when no `toolbar` prop is provided:

```ts
const DEFAULT_TOOLBAR: ToolbarConfig = [
  ['undo', 'redo'],
  ['heading', 'fontFamily', 'fontSize'],
  ['bold', 'italic', 'underline', 'strikethrough'],
  ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  ['bulletList', 'orderedList', 'indent', 'outdent'],
  ['link', 'image', 'table', 'blockquote', 'codeBlock', 'inlineCode', 'hr'],
  ['textColor', 'backgroundColor'],
  ['emoji', 'specialChars', 'findReplace'],
  ['clearFormat', 'removeLink', 'print', 'fullscreen', 'sourceView'],
  ['importWord', 'exportWord', 'exportPdf'],
]
```

## Built-in key reference

Full table of all built-in toolbar keys:

| Key | Category | Description |
|-----|----------|-------------|
| `undo` | History | Undo the last action |
| `redo` | History | Redo the last undone action |
| `heading` | Block | Heading picker (Normal, H1–H6) |
| `fontFamily` | Text | Font family selector |
| `fontSize` | Text | Font size selector |
| `bold` | Inline | Toggle bold (`<strong>`) |
| `italic` | Inline | Toggle italic (`<em>`) |
| `underline` | Inline | Toggle underline |
| `strikethrough` | Inline | Toggle strikethrough |
| `subscript` | Inline | Toggle subscript (`<sub>`) |
| `superscript` | Inline | Toggle superscript (`<sup>`) |
| `alignLeft` | Alignment | Left-align the current block |
| `alignCenter` | Alignment | Center-align the current block |
| `alignRight` | Alignment | Right-align the current block |
| `alignJustify` | Alignment | Justify the current block |
| `bulletList` | List | Toggle an unordered list |
| `orderedList` | List | Toggle an ordered list |
| `indent` | List | Increase indent level |
| `outdent` | List | Decrease indent level |
| `link` | Insert | Insert or edit a hyperlink |
| `removeLink` | Insert | Remove the hyperlink at the cursor |
| `image` | Insert | Insert an image |
| `table` | Insert | Insert a table |
| `blockquote` | Insert | Toggle a block quote |
| `codeBlock` | Insert | Insert a fenced code block |
| `inlineCode` | Inline | Toggle inline code |
| `hr` | Insert | Insert a horizontal rule |
| `emoji` | Insert | Open emoji picker |
| `specialChars` | Insert | Open special characters picker |
| `textColor` | Color | Set text foreground color |
| `backgroundColor` | Color | Set text background/highlight color |
| `clearFormat` | Utility | Remove all inline formatting |
| `findReplace` | Utility | Open find & replace dialog |
| `fullscreen` | Utility | Toggle fullscreen mode |
| `sourceView` | Utility | Toggle raw HTML source view |
| `print` | Utility | Print the editor content |
| `importWord` | File | Import a `.docx` file |
| `exportWord` | File | Export as `.docx` |
| `exportPdf` | File | Export as `.pdf` |

## Examples

### Using DEFAULT_TOOLBAR as a base

```ts
import { DEFAULT_TOOLBAR, type ToolbarConfig } from 'openwrite'

// Remove the file operations group and add a custom plugin key
const myToolbar: ToolbarConfig = [
  ...DEFAULT_TOOLBAR.slice(0, -1),  // drop last group (importWord, exportWord, exportPdf)
  ['my-custom-action'],
]
```

### Type-safe toolbar builder

```ts
import type { BuiltinToolbarKey, ToolbarConfig } from 'openwrite'

function makeGroup(...keys: BuiltinToolbarKey[]): BuiltinToolbarKey[] {
  return keys
}

const toolbar: ToolbarConfig = [
  makeGroup('undo', 'redo'),
  makeGroup('bold', 'italic', 'underline'),
  makeGroup('link', 'image'),
]
```

### Mixing built-in and plugin keys

```ts
const toolbar: ToolbarConfig = [
  ['bold', 'italic'],          // built-in keys
  ['my-timestamp', 'ai-tone'], // plugin keys (strings, not BuiltinToolbarKey)
]
```

::: tip Ordering
Items within a group render left to right in the order they appear in the array. Groups are rendered left to right and separated by a vertical divider.
:::
