# Plugin System API

Complete interface reference for the OpenWrite plugin system.

## Import

```ts
import type {
  OpenWritePlugin,
  CustomToolbarItem,
  EditorCommandAPI,
} from 'openwrite'
```

## `OpenWritePlugin`

The top-level interface for a plugin. Pass an array of plugins to the `plugins` prop.

```ts
interface OpenWritePlugin {
  name: string
  toolbarItems?: CustomToolbarItem[]
  setup?: (api: EditorCommandAPI) => void
  teardown?: () => void
}
```

### Fields

#### `name: string`

A unique identifier for the plugin. Used internally for deduplication and logging. Choose a name that is unlikely to collide with other plugins (e.g. include your organisation name: `'acme-timestamp'`).

```ts
const myPlugin: OpenWritePlugin = {
  name: 'acme-timestamp',
  // …
}
```

#### `toolbarItems?: CustomToolbarItem[]`

An optional array of toolbar button definitions contributed by this plugin. Each item must have a unique `key` that is referenced in the `toolbar` prop to place the button.

#### `setup?: (api: EditorCommandAPI) => void`

Called once immediately after the editor mounts. Use it to initialise state, attach event listeners, or integrate with external services. The `api` argument provides the same `EditorCommandAPI` passed to each toolbar item's `command` function.

```ts
setup(api) {
  this._interval = setInterval(() => {
    console.log('Current content length:', api.getHTML().length)
  }, 10_000)
},
```

#### `teardown?: () => void`

Called when the editor component unmounts. Clean up any resources created in `setup` (event listeners, timers, subscriptions) to prevent memory leaks.

```ts
teardown() {
  clearInterval(this._interval)
},
```

---

## `CustomToolbarItem`

Defines a single toolbar button contributed by a plugin.

```ts
interface CustomToolbarItem {
  key: string
  icon: React.ReactNode
  label: string
  command: (api: EditorCommandAPI) => void
  isActive?: (api: EditorCommandAPI) => boolean
  isDisabled?: (api: EditorCommandAPI) => boolean
}
```

### Fields

#### `key: string`

A unique string key for the toolbar item. This key is what you reference in the `toolbar` prop to position the button:

```tsx
// Plugin definition
{ key: 'acme-highlight', /* … */ }

// Toolbar usage
<OpenWrite toolbar={[['bold', 'acme-highlight']]} />
```

::: warning Key uniqueness
Keys must be unique across all plugins and must not match any `BuiltinToolbarKey`. A development warning is emitted for duplicates.
:::

#### `icon: React.ReactNode`

The button's visual content. Can be any React node: an SVG element, an icon from a library (Lucide, Heroicons, etc.), an emoji string, or a short text abbreviation.

```tsx
// SVG icon
icon: <svg viewBox="0 0 16 16" width={16} height={16}>…</svg>

// Lucide icon
icon: <Clock size={16} />

// Text abbreviation
icon: <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>TS</span>
```

#### `label: string`

The accessible label shown as a tooltip on hover and read by screen readers. Keep it short and descriptive.

#### `command: (api: EditorCommandAPI) => void`

The function called when the user clicks the button. Receives an `EditorCommandAPI` instance. Can be `async`.

```ts
command(api) {
  api.insertHTML('<mark>highlighted</mark>')
  api.focus()
},
```

#### `isActive?: (api: EditorCommandAPI) => boolean`

Optional. Return `true` to render the button in an "active" or "pressed" visual state. Called on every editor state change. Keep this function fast — avoid heavy computation.

```ts
isActive(api) {
  // Active when the editor has more than 100 words
  const text = api.getHTML().replace(/<[^>]+>/g, ' ').trim()
  return text.split(/\s+/).length > 100
},
```

#### `isDisabled?: (api: EditorCommandAPI) => boolean`

Optional. Return `true` to disable the button. Disabled buttons are greyed out and cannot be clicked.

```ts
isDisabled(api) {
  return api.getHTML() === '' || api.getHTML() === '<p><br></p>'
},
```

---

## `EditorCommandAPI`

The API object provided to plugin callbacks. It gives plugins the same low-level access to the editor used by built-in toolbar items.

```ts
interface EditorCommandAPI {
  execFormat(command: string, value?: string): void
  insertHTML(html: string): void
  getHTML(): string
  setHTML(html: string): void
  focus(): void
}
```

### Methods

#### `execFormat(command: string, value?: string): void`

Executes a named formatting command on the current selection. Command names match `document.execCommand` names and OpenWrite's internal command registry.

```ts
api.execFormat('bold')
api.execFormat('foreColor', '#2563eb')
api.execFormat('fontSize', '18px')
```

#### `insertHTML(html: string): void`

Inserts an HTML string at the current cursor position. Existing content is not affected.

```ts
api.insertHTML('<hr />')
api.insertHTML(`<abbr title="As soon as possible">ASAP</abbr>`)
```

#### `getHTML(): string`

Returns the editor's current full HTML content as a string.

```ts
const content = api.getHTML()
```

#### `setHTML(html: string): void`

Replaces the entire editor content with the provided HTML string.

```ts
api.setHTML('<p>Fresh start.</p>')
```

#### `focus(): void`

Moves keyboard focus into the editor's content area.

```ts
api.focus()
```

---

## Minimal plugin example

```tsx
import type { OpenWritePlugin } from 'openwrite'

export const hrPlugin: OpenWritePlugin = {
  name: 'hr-double',

  toolbarItems: [
    {
      key: 'insert-double-hr',
      icon: <span>═══</span>,
      label: 'Insert double rule',
      command(api) {
        api.insertHTML('<hr /><hr />')
        api.focus()
      },
    },
  ],
}
```

See the [Plugin System guide](/guide/plugins) for a complete walkthrough with more examples.
