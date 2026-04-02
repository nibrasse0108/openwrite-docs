---
layout: home

hero:
  name: "OpenWrite"
  tagline: "A modern, extensible rich-text editor with 40+ toolbar items, plugin system, dark mode, i18n, and Word/PDF import-export — built for Reactjs."
  image:
    src: /openwrite-logo.svg
    alt: OpenWrite
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/OPENWRITE-editor/openwrite

features:
  - icon: 🔌
    title: Plugin System
    details: Extend the editor with custom toolbar items and commands through a simple, well-typed plugin API. Build anything from signature pads to AI-powered writing tools.

  - icon: 💬
    title: Floating Toolbar
    details: Enable a context-sensitive floating toolbar that appears whenever the user selects text — perfect for distraction-free writing interfaces.

  - icon: 📊
    title: Word Count
    details: Built-in word and character count component. Use the showWordCount prop or the standalone <WordCount> component anywhere in your UI.

  - icon: 🌗
    title: Light & Dark Themes
    details: First-class dark mode support via the theme prop. The editor adapts to your application's color scheme without any extra CSS.

  - icon: 🌍
    title: Internationalization
    details: Ships with English and French locales out of the box. Supply a partial or full EditorLocale object to override any string in the UI.

  - icon: 📄
    title: Import & Export
    details: Import .docx files and export editor content to Word or PDF with a single function call — or let users do it from the toolbar.

  - icon: 🛠️
    title: Toolbar Customization
    details: Configure the toolbar as an array of groups, each containing built-in or custom keys. Reorder, remove, or add items with full TypeScript support.

  - icon: ⚡
    title: Next.js Ready
    details: Works seamlessly with the Next.js App Router. A single dynamic import with ssr:false is all you need to integrate OpenWrite into your project.

  - icon: 🔷
    title: TypeScript First
    details: Every prop, ref method, plugin interface, and locale shape is fully typed. Enjoy autocomplete and compile-time safety across your entire editor integration.
---

## Quick start

Install OpenWrite and render your first editor in under a minute.

```bash
npm install openwrite
```

```tsx
import { OpenWrite } from 'openwrite'
import 'openwrite/styles'

export default function App() {
  return (
    <OpenWrite
      defaultValue="<p>Start writing...</p>"
      minHeight={300}
    />
  )
}
```

<div style="margin-top: 2rem; text-align: center;">
  <a href="/guide/" style="display:inline-block;padding:0.6rem 1.4rem;background:#2787d6;color:#fff;border-radius:8px;font-weight:600;text-decoration:none;">Read the full guide →</a>
</div>
