# Import & Export

OpenWrite supports importing `.docx` Word files into the editor and exporting editor content as `.docx` or `.pdf`. Both programmatic and toolbar-button approaches are available.

## Toolbar buttons

The easiest way to expose import/export to users is through the built-in toolbar buttons:

| Key | Action |
|-----|--------|
| `importWord` | Opens a file picker; converts the selected `.docx` to HTML and loads it into the editor |
| `exportWord` | Downloads the current editor content as a `.docx` file |
| `exportPdf` | Downloads the current editor content as a `.pdf` file |

Add them to your toolbar configuration:

```tsx
<OpenWrite
  toolbar={[
    ['undo', 'redo'],
    ['bold', 'italic'],
    ['importWord', 'exportWord', 'exportPdf'],  // import/export group
  ]}
  onChange={setHtml}
/>
```

## Programmatic API

For custom import/export UIs (drag-and-drop zones, custom buttons, automated pipelines), use the exported utility functions directly.

### `importFromWord(file: File): Promise<string>`

Converts a `.docx` `File` object to an HTML string. The returned string can be passed directly to `setHTML` on the editor ref or used to update state.

```tsx
import { useRef } from 'react'
import { OpenWrite, importFromWord, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function ImportExample() {
  const editorRef = useRef<EditorRef>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const html = await importFromWord(file)
      editorRef.current?.setHTML(html)
    } catch (err) {
      console.error('Import failed:', err)
    }
  }

  return (
    <div>
      <label>
        Import Word document:
        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <OpenWrite ref={editorRef} minHeight={400} onChange={() => {}} />
    </div>
  )
}
```

### `exportToWord(html: string, filename?: string): Promise<void>`

Converts an HTML string to a `.docx` file and triggers a browser download.

```tsx
import { useRef } from 'react'
import { OpenWrite, exportToWord, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function ExportWordExample() {
  const editorRef = useRef<EditorRef>(null)

  async function handleExport() {
    const html = editorRef.current?.getHTML() ?? ''
    await exportToWord(html, 'my-document.docx')
  }

  return (
    <div>
      <OpenWrite ref={editorRef} defaultValue="<p>Content to export</p>" onChange={() => {}} />
      <button onClick={handleExport} style={{ marginTop: '0.5rem' }}>
        Download as Word
      </button>
    </div>
  )
}
```

### `exportToPdf(html: string, filename?: string): Promise<void>`

Converts an HTML string to a `.pdf` file and triggers a browser download.

```tsx
import { useRef } from 'react'
import { OpenWrite, exportToPdf, type EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function ExportPdfExample() {
  const editorRef = useRef<EditorRef>(null)

  async function handleExport() {
    const html = editorRef.current?.getHTML() ?? ''
    await exportToPdf(html, 'my-document.pdf')
  }

  return (
    <div>
      <OpenWrite ref={editorRef} defaultValue="<p>Content to export</p>" onChange={() => {}} />
      <button onClick={handleExport} style={{ marginTop: '0.5rem' }}>
        Download as PDF
      </button>
    </div>
  )
}
```

## Function signatures

```ts
function importFromWord(file: File): Promise<string>

function exportToWord(html: string, filename?: string): Promise<void>

function exportToPdf(html: string, filename?: string): Promise<void>
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `file` | `File` | — | A `.docx` File object (e.g. from an `<input type="file">`) |
| `html` | `string` | — | HTML string to export (from `getHTML()` or `onChange`) |
| `filename` | `string` | `'document.docx'` / `'document.pdf'` | Name of the downloaded file |

## Image handling during import

When importing a Word document that contains embedded images, OpenWrite converts them to base64 data URIs by default. To store images on your own server instead, handle the upload after import:

```tsx
const html = await importFromWord(file)

// Post-process: find base64 images and upload them
const processedHtml = await uploadEmbeddedImages(html, async (dataUri) => {
  const blob = dataUriToBlob(dataUri)
  const url  = await uploadToMyServer(blob)
  return url
})

editorRef.current?.setHTML(processedHtml)
```

::: warning Large documents
Very large `.docx` files (many pages, many images) can be slow to process in the browser. Consider showing a loading indicator while `importFromWord` resolves.
:::

::: tip Server-side export
`exportToWord` and `exportToPdf` run entirely in the browser using WebAssembly-based libraries. No server round-trip is required. If you need server-side rendering of documents (e.g. for automated pipelines), call these functions in a Node.js environment where the same package can be imported.
:::
