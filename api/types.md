# Types

All public types exported from the `openwrite` package.

## Import

```ts
import type {
  EditorTheme,
  HeadingLevel,
  ActiveFormats,
  EditorLocale,
  ToolbarConfig,
  ToolbarGroup,
  ToolbarItem,
  BuiltinToolbarKey,
  EditorProps,
  EditorRef,
  OpenWritePlugin,
  CustomToolbarItem,
  EditorCommandAPI,
} from 'openwrite'
```

---

## `EditorTheme`

The valid values for the `theme` prop:

```ts
type EditorTheme = 'light' | 'dark'
```

**Usage:**

```tsx
import type { EditorTheme } from 'openwrite'

const [theme, setTheme] = useState<EditorTheme>('light')

<OpenWrite theme={theme} onChange={setHtml} />
```

---

## `HeadingLevel`

Represents the heading levels supported by the `heading` toolbar item:

```ts
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
```

This type is primarily used when programmatically executing heading commands:

```ts
editorRef.current?.execCommand('heading', '2')  // apply H2
```

---

## `ActiveFormats`

An object describing which formatting commands are currently active at the cursor position or selection. This is used internally by toolbar items to determine their active state, but can also be read by plugins.

```ts
interface ActiveFormats {
  bold: boolean
  italic: boolean
  underline: boolean
  strikethrough: boolean
  subscript: boolean
  superscript: boolean
  alignLeft: boolean
  alignCenter: boolean
  alignRight: boolean
  alignJustify: boolean
  bulletList: boolean
  orderedList: boolean
  blockquote: boolean
  codeBlock: boolean
  inlineCode: boolean
  heading: HeadingLevel | null
  fontFamily: string | null
  fontSize: string | null
  textColor: string | null
  backgroundColor: string | null
  link: boolean
}
```

---

## `EditorLocale`

The complete shape of a locale object. All keys are required when providing a full locale; use `Partial<EditorLocale>` for partial overrides.

```ts
interface EditorLocale {
  toolbar: {
    undo: string
    redo: string
    heading: string
    fontFamily: string
    fontSize: string
    bold: string
    italic: string
    underline: string
    strikethrough: string
    subscript: string
    superscript: string
    alignLeft: string
    alignCenter: string
    alignRight: string
    alignJustify: string
    bulletList: string
    orderedList: string
    indent: string
    outdent: string
    link: string
    removeLink: string
    image: string
    table: string
    blockquote: string
    codeBlock: string
    inlineCode: string
    hr: string
    emoji: string
    specialChars: string
    textColor: string
    backgroundColor: string
    clearFormat: string
    findReplace: string
    fullscreen: string
    sourceView: string
    print: string
    importWord: string
    exportWord: string
    exportPdf: string
  }

  dialogs: {
    insertLink: {
      title: string
      urlLabel: string
      textLabel: string
      openInNewTab: string
      confirm: string
      cancel: string
    }
    insertImage: {
      title: string
      urlLabel: string
      altLabel: string
      uploadLabel: string
      confirm: string
      cancel: string
    }
    insertTable: {
      title: string
      rowsLabel: string
      colsLabel: string
      confirm: string
      cancel: string
    }
    findReplace: {
      title: string
      findLabel: string
      replaceLabel: string
      next: string
      previous: string
      replaceOne: string
      replaceAll: string
      caseSensitive: string
      noResults: string
    }
    sourceView: {
      title: string
      confirm: string
      cancel: string
    }
  }

  wordCount: {
    words: string
    characters: string
  }

  placeholder: string
}
```

### Named locale exports

The two built-in locales are exported as named constants:

```ts
import { localeEn, localeFr } from 'openwrite'
```

Both satisfy the full `EditorLocale` interface.

---

## `BuiltinToolbarKey`

See [Toolbar Config reference](/api/toolbar-config#builtintoolbarkey) for the full union type.

---

## `ToolbarItem`, `ToolbarGroup`, `ToolbarConfig`

See [Toolbar Config reference](/api/toolbar-config) for the full type definitions.

---

## `OpenWritePlugin`, `CustomToolbarItem`, `EditorCommandAPI`

See [Plugin System reference](/api/plugin-system) for the full interface definitions.

---

## `EditorProps`

See [EditorProps reference](/api/editor-props) for the full interface.

---

## `EditorRef`

See [EditorRef reference](/api/editor-ref) for the full interface.

---

## Utility type: `DeepPartial<EditorLocale>`

When you only want to override a few strings deep inside the locale object (e.g. a single dialog label), you can use the `Partial<EditorLocale>` type or construct your locale incrementally using the spread operator:

```ts
import { localeEn, type EditorLocale } from 'openwrite'

const myLocale: EditorLocale = {
  ...localeEn,
  toolbar: {
    ...localeEn.toolbar,
    bold: 'Fett',
    italic: 'Kursiv',
  },
  wordCount: {
    words: 'Wörter',
    characters: 'Zeichen',
  },
}
```

::: tip Type exports
All types listed on this page are re-exported from the main `openwrite` package entry point. There is no need to import from sub-paths like `openwrite/types`.
:::
