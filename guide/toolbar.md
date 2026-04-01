# Toolbar

OpenWrite's toolbar is fully configurable. You can reorder groups, remove built-in items, and add custom items via plugins — all with TypeScript safety.

## ToolbarConfig shape

The `toolbar` prop accepts a `ToolbarConfig`, which is an array of **groups**. Each group is an array of **toolbar keys**. Groups are visually separated by a divider.

```ts
type ToolbarItem  = BuiltinToolbarKey | string  // string for plugin keys
type ToolbarGroup = ToolbarItem[]
type ToolbarConfig = ToolbarGroup[]
```

A minimal two-group toolbar:

```tsx
<OpenWrite
  toolbar={[
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ]}
  onChange={setHtml}
/>
```

## Built-in toolbar keys

All 40+ built-in keys and their descriptions:

| Key | Description |
|-----|-------------|
| `undo` | Undo the last action |
| `redo` | Redo the last undone action |
| `heading` | Block-level heading picker (H1–H6) |
| `fontFamily` | Font family dropdown |
| `fontSize` | Font size dropdown |
| `bold` | Toggle bold (`<strong>`) |
| `italic` | Toggle italic (`<em>`) |
| `underline` | Toggle underline |
| `strikethrough` | Toggle strikethrough |
| `subscript` | Toggle subscript (`<sub>`) |
| `superscript` | Toggle superscript (`<sup>`) |
| `alignLeft` | Align text to the left |
| `alignCenter` | Center-align text |
| `alignRight` | Align text to the right |
| `alignJustify` | Justify text |
| `bulletList` | Toggle an unordered list |
| `orderedList` | Toggle an ordered list |
| `indent` | Increase indent |
| `outdent` | Decrease indent |
| `link` | Insert or edit a hyperlink |
| `removeLink` | Remove the link at the cursor |
| `image` | Insert an image (URL or upload) |
| `table` | Insert a table |
| `blockquote` | Toggle a block quote |
| `codeBlock` | Insert a fenced code block |
| `inlineCode` | Toggle inline code |
| `hr` | Insert a horizontal rule |
| `emoji` | Open the emoji picker |
| `specialChars` | Open the special characters picker |
| `textColor` | Set the foreground text color |
| `backgroundColor` | Set the text background/highlight color |
| `clearFormat` | Remove all inline formatting |
| `findReplace` | Open the find & replace dialog |
| `fullscreen` | Toggle fullscreen editing mode |
| `sourceView` | Toggle the raw HTML source view |
| `print` | Print the editor content |
| `importWord` | Import a `.docx` file into the editor |
| `exportWord` | Export editor content as a `.docx` file |
| `exportPdf` | Export editor content as a `.pdf` file |

## Default toolbar

When you do not supply a `toolbar` prop, OpenWrite uses `DEFAULT_TOOLBAR`:

```ts
import { DEFAULT_TOOLBAR } from 'openwrite'

// DEFAULT_TOOLBAR value:
const DEFAULT_TOOLBAR = [
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

## Custom toolbar examples

### Minimal writing toolbar

```tsx
<OpenWrite
  toolbar={[
    ['undo', 'redo'],
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['bulletList', 'orderedList'],
    ['link'],
    ['clearFormat'],
  ]}
  onChange={setHtml}
/>
```

### Blog post editor toolbar

```tsx
<OpenWrite
  toolbar={[
    ['undo', 'redo'],
    ['heading', 'fontSize'],
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['alignLeft', 'alignCenter', 'alignRight'],
    ['bulletList', 'orderedList', 'indent', 'outdent'],
    ['link', 'image', 'blockquote', 'codeBlock', 'hr'],
    ['textColor', 'backgroundColor'],
    ['emoji'],
    ['clearFormat', 'fullscreen'],
  ]}
  onChange={setHtml}
/>
```

### Adding a custom plugin key

After [registering a plugin](/guide/plugins) that declares a `toolbarItems` array, include its key alongside built-in keys:

```tsx
import { myTimestampPlugin } from './plugins/timestamp'

<OpenWrite
  plugins={[myTimestampPlugin]}
  toolbar={[
    ['bold', 'italic'],
    ['link'],
    ['my-timestamp'],  // custom key from the plugin
  ]}
  onChange={setHtml}
/>
```

::: tip Unknown keys
If a toolbar key is not matched by any built-in item or registered plugin, it is silently ignored. This makes it safe to feature-flag items without crashing.
:::

## TypeScript: BuiltinToolbarKey

All built-in string literals are exported as the `BuiltinToolbarKey` union type so you get autocomplete and compile-time checking:

```ts
import type { BuiltinToolbarKey, ToolbarConfig } from 'openwrite'

const myToolbar: ToolbarConfig = [
  ['bold' satisfies BuiltinToolbarKey, 'italic'],
  ['link', 'image'],
]
```
