# Introduction

**OpenWrite** is a modern, fully-featured WYSIWYG (What You See Is What You Get) rich-text editor designed for React and Next.js applications. It provides an experience similar to popular desktop word processors while fitting naturally into component-based React code.

## What is OpenWrite?

OpenWrite wraps a battle-tested `contenteditable` engine in a carefully designed React component. Unlike raw `contenteditable` hacks, OpenWrite provides:

- A controlled / uncontrolled React model (`value` + `onChange` or `defaultValue`)
- A fully type-safe API with `EditorRef` for imperative operations
- A flexible toolbar system with 40+ built-in items and unlimited custom extensions
- First-class support for dark mode, i18n, and accessibility

OpenWrite is **not** a markdown editor — it works with HTML strings, which makes it a natural fit for applications that persist rich text in a database and render it directly in the browser.

## Key Features

- **40+ toolbar items** — text formatting, headings, font family/size, alignment, lists, links, images, tables, code blocks, emoji, special characters, find & replace, fullscreen, source view, and more
- **Plugin system** — register custom toolbar buttons with their own commands using the `OpenWritePlugin` interface
- **Floating toolbar** — an optional bubble toolbar that appears on text selection for a distraction-free editing experience
- **Word count** — built-in `showWordCount` prop and a standalone `<WordCount>` component
- **Light / dark theme** — controlled by the `theme` prop; no extra CSS variables needed
- **i18n** — ships with `"en"` and `"fr"` locales; fully customisable via an `EditorLocale` object
- **Import & Export** — `importFromWord`, `exportToWord`, `exportToPdf` utilities plus matching toolbar buttons
- **TypeScript first** — every interface, type, and prop is exported and fully documented
- **Next.js compatible** — simple dynamic import pattern for App Router and Pages Router

## Quick Example

```tsx
import { useRef, useState } from 'react'
import { OpenWrite, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function MyEditor() {
  const [html, setHtml] = useState('<p>Hello, <strong>world</strong>!</p>')
  const editorRef = useRef<EditorRef>(null)

  return (
    <div>
      <OpenWrite
        ref={editorRef}
        value={html}
        onChange={setHtml}
        theme="light"
        minHeight={400}
        placeholder="Start writing…"
        showWordCount
      />

      <button onClick={() => console.log(editorRef.current?.getHTML())}>
        Log HTML
      </button>
    </div>
  )
}
```

## Philosophy

OpenWrite follows three guiding principles:

1. **Zero surprise** — the component behaves exactly like any other controlled React input. Pass `value` and `onChange`; get HTML strings in and out.
2. **Batteries included, but removable** — the default toolbar is comprehensive. Every item can be removed; custom items can be added through plugins.
3. **Escape hatches** — when the component model is not enough, `EditorRef` gives you direct imperative access to the underlying editor engine.

## Browser Support

OpenWrite supports all modern evergreen browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

::: tip TypeScript
All types are exported from the main `openwrite` package entry point. You do not need a separate `@types/openwrite` package.
:::

## License

OpenWrite is open-source software released under the [MIT License](https://opensource.org/licenses/MIT).
