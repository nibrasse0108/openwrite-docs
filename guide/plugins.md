# Plugin System

The plugin system lets you extend OpenWrite with custom toolbar buttons that integrate seamlessly alongside built-in items. Plugins have access to the same command API used internally, so they can read and write the editor's HTML content, execute formatting commands, and respond to editor state.

## Plugin interface

```ts
interface OpenWritePlugin {
  /** Unique name for the plugin. Used for debugging and deduplication. */
  name: string

  /** Custom toolbar button definitions contributed by this plugin. */
  toolbarItems?: CustomToolbarItem[]

  /**
   * Called once when the editor mounts.
   * Use this to set up event listeners, subscriptions, or external integrations.
   */
  setup?: (api: EditorCommandAPI) => void

  /**
   * Called when the editor unmounts.
   * Clean up anything created in setup (listeners, timers, etc.).
   */
  teardown?: () => void
}
```

## CustomToolbarItem

Each item in `toolbarItems` defines a button that appears in the toolbar:

```ts
interface CustomToolbarItem {
  /** Must be unique across all plugins and must not clash with built-in keys. */
  key: string

  /** The button icon — any React node (SVG, image, text). */
  icon: React.ReactNode

  /** Tooltip / accessible label. */
  label: string

  /** Called when the user clicks the button. */
  command: (api: EditorCommandAPI) => void

  /** Return true to render the button in an "active" (pressed) state. */
  isActive?: (api: EditorCommandAPI) => boolean

  /** Return true to disable the button. */
  isDisabled?: (api: EditorCommandAPI) => boolean
}
```

## EditorCommandAPI

The API object passed to `setup`, `command`, `isActive`, and `isDisabled`:

```ts
interface EditorCommandAPI {
  /** Execute a named formatting command (same commands as document.execCommand). */
  execFormat(command: string, value?: string): void

  /** Insert an arbitrary HTML string at the current cursor position. */
  insertHTML(html: string): void

  /** Get the editor's current HTML content. */
  getHTML(): string

  /** Replace the editor's content with the provided HTML string. */
  setHTML(html: string): void

  /** Move focus into the editor. */
  focus(): void
}
```

## Complete example: Timestamp plugin

This plugin adds a toolbar button that inserts the current date and time at the cursor position.

```tsx
// plugins/timestamp.tsx
import { Clock } from 'lucide-react'
import type { OpenWritePlugin } from 'openwrite'

export const timestampPlugin: OpenWritePlugin = {
  name: 'timestamp',

  toolbarItems: [
    {
      key: 'insert-timestamp',
      icon: <Clock size={16} />,
      label: 'Insert timestamp',

      command(api) {
        const now = new Date().toLocaleString()
        api.insertHTML(`<time datetime="${new Date().toISOString()}">${now}</time>`)
        api.focus()
      },

      isDisabled(api) {
        // Disable the button when the editor has no content yet
        return api.getHTML() === '' || api.getHTML() === '<p><br></p>'
      },
    },
  ],

  setup(api) {
    console.log('[timestamp plugin] mounted')
  },

  teardown() {
    console.log('[timestamp plugin] unmounted')
  },
}
```

## Registering a plugin

Pass the plugin instance to the `plugins` prop:

```tsx
import { OpenWrite } from 'openwrite'
import { timestampPlugin } from './plugins/timestamp'
import 'openwrite/styles'

export default function App() {
  return (
    <OpenWrite
      plugins={[timestampPlugin]}
      toolbar={[
        ['undo', 'redo'],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['insert-timestamp'],  // <-- plugin key in its own group
      ]}
      onChange={setHtml}
    />
  )
}
```

::: tip Plugin key placement
Plugin keys can be placed in any position within any group, or mixed with built-in keys in the same group. The toolbar renders items in the order they appear.
:::

## Multi-item plugin

A single plugin can contribute multiple toolbar items:

```tsx
// plugins/ai-assist.tsx
import type { OpenWritePlugin } from 'openwrite'

export const aiAssistPlugin: OpenWritePlugin = {
  name: 'ai-assist',

  toolbarItems: [
    {
      key: 'ai-summarize',
      icon: <SparklesIcon />,
      label: 'Summarize with AI',
      async command(api) {
        const html  = api.getHTML()
        const plain = html.replace(/<[^>]+>/g, ' ').trim()
        const summary = await fetchAISummary(plain)
        api.setHTML(`<p><strong>Summary:</strong> ${summary}</p>\n${html}`)
      },
    },
    {
      key: 'ai-translate',
      icon: <TranslateIcon />,
      label: 'Translate with AI',
      async command(api) {
        const html = api.getHTML()
        const translated = await fetchAITranslation(html, 'fr')
        api.setHTML(translated)
      },
    },
  ],
}
```

Then in the toolbar:

```tsx
<OpenWrite
  plugins={[aiAssistPlugin]}
  toolbar={[
    ['bold', 'italic'],
    ['ai-summarize', 'ai-translate'],
  ]}
  onChange={setHtml}
/>
```

## Multiple plugins

Pass an array of plugins to combine contributions from different plugins:

```tsx
<OpenWrite
  plugins={[timestampPlugin, aiAssistPlugin, myOtherPlugin]}
  toolbar={[
    ['bold', 'italic'],
    ['insert-timestamp', 'ai-summarize', 'ai-translate'],
  ]}
  onChange={setHtml}
/>
```

::: warning Key collisions
Plugin keys must be unique across all plugins and must not match any built-in toolbar key. OpenWrite will warn in development mode if a duplicate key is detected.
:::

## Using execFormat

`execFormat` wraps the browser's `document.execCommand` and OpenWrite's internal command registry. You can use it to apply any standard formatting command:

```ts
command(api) {
  // Make selected text red
  api.execFormat('foreColor', '#dc2626')
}
```

```ts
command(api) {
  // Insert a horizontal rule
  api.execFormat('insertHorizontalRule')
}
```

::: tip insertHTML vs execFormat
Prefer `insertHTML` for inserting structured content (custom elements, templates) and `execFormat` for toggling or applying standard text formatting that should participate in the editor's undo history.
:::
