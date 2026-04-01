# Next.js

OpenWrite works with both the App Router (Next.js 13+) and the Pages Router. Because it relies on browser APIs (`document`, `window`, `Selection`, etc.), it must be rendered client-side only.

## App Router (recommended)

### Using the `"use client"` directive

The simplest approach for the App Router is to create a dedicated client component that wraps the editor:

```tsx
// components/RichEditor.tsx
'use client'

import { useRef, useState } from 'react'
import { OpenWrite, type EditorRef } from 'openwrite'
import 'openwrite/styles'

interface RichEditorProps {
  initialValue?: string
  onSave?: (html: string) => void
}

export default function RichEditor({ initialValue = '', onSave }: RichEditorProps) {
  const [html, setHtml] = useState(initialValue)
  const editorRef = useRef<EditorRef>(null)

  return (
    <div>
      <OpenWrite
        ref={editorRef}
        value={html}
        onChange={setHtml}
        theme="light"
        minHeight={400}
        showWordCount
        placeholder="Start writing…"
      />
      {onSave && (
        <button
          onClick={() => onSave(editorRef.current?.getHTML() ?? '')}
          style={{ marginTop: '0.75rem' }}
        >
          Save
        </button>
      )}
    </div>
  )
}
```

Then use it in any Server Component or page:

```tsx
// app/posts/new/page.tsx
import RichEditor from '@/components/RichEditor'

export default function NewPostPage() {
  async function savePost(html: string) {
    'use server'
    await db.posts.create({ content: html })
  }

  return (
    <main>
      <h1>New Post</h1>
      <RichEditor onSave={savePost} />
    </main>
  )
}
```

### Using dynamic import with `ssr: false`

If you prefer not to mark a component as `'use client'`, or if you want to keep the editor out of the initial JavaScript bundle, use Next.js `dynamic` with `ssr: false`:

```tsx
// components/DynamicEditor.tsx
import dynamic from 'next/dynamic'

const OpenWrite = dynamic(
  () => import('openwrite').then((mod) => mod.OpenWrite),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 400,
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
        }}
      >
        Loading editor…
      </div>
    ),
  }
)

export default OpenWrite
```

Then use `DynamicEditor` exactly like the regular `OpenWrite` component:

```tsx
// app/write/page.tsx
'use client'

import { useState } from 'react'
import DynamicEditor from '@/components/DynamicEditor'
import 'openwrite/styles'

export default function WritePage() {
  const [html, setHtml] = useState('')

  return <DynamicEditor value={html} onChange={setHtml} minHeight={500} />
}
```

::: tip Which approach to choose?
- Use `'use client'` when the editor component needs to share state with other client components on the same page.
- Use `dynamic` with `ssr: false` when you want to defer loading the editor bundle until after the initial page paint, improving Time to First Byte (TTFB) for content-heavy pages.
:::

## Pages Router

In the Pages Router, use `dynamic` with `ssr: false` at the page or component level:

```tsx
// pages/write.tsx
import dynamic from 'next/dynamic'
import { useState } from 'react'
import 'openwrite/styles'

const OpenWrite = dynamic(
  () => import('openwrite').then((mod) => mod.OpenWrite),
  { ssr: false }
)

export default function WritePage() {
  const [html, setHtml] = useState('')

  return (
    <div>
      <h1>Write</h1>
      <OpenWrite
        value={html}
        onChange={setHtml}
        minHeight={400}
        showWordCount
      />
    </div>
  )
}
```

## Using EditorRef with dynamic import

When using `dynamic`, you still have access to `EditorRef`. Wrap your dynamic component in a `forwardRef`-aware pattern:

```tsx
// components/DynamicEditorWithRef.tsx
'use client'

import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import type { EditorRef, EditorProps } from 'openwrite'

const OpenWriteInner = dynamic(
  () => import('openwrite').then((m) => m.OpenWrite),
  { ssr: false }
)

const DynamicEditor = forwardRef<EditorRef, EditorProps>((props, ref) => (
  <OpenWriteInner {...props} ref={ref} />
))
DynamicEditor.displayName = 'DynamicEditor'

export default DynamicEditor
```

```tsx
// app/edit/page.tsx
'use client'

import { useRef } from 'react'
import DynamicEditor from '@/components/DynamicEditorWithRef'
import type { EditorRef } from 'openwrite'
import 'openwrite/styles'

export default function EditPage() {
  const ref = useRef<EditorRef>(null)

  return (
    <>
      <DynamicEditor ref={ref} defaultValue="<p>Edit me</p>" onChange={() => {}} />
      <button onClick={() => console.log(ref.current?.getHTML())}>
        Log HTML
      </button>
    </>
  )
}
```

## CSS import in Next.js

Import `'openwrite/styles'` once in your layout file so it is applied globally. Do **not** import it inside the `dynamic()` factory — that can cause style flickering on navigation.

::: warning Turbopack
If you are using Next.js with Turbopack (`next dev --turbo`), CSS imports from `node_modules` may require explicit configuration in `next.config.ts`. Check the Next.js Turbopack documentation if you see style-loading errors.
:::
