# openwrite-docs

Documentation site for [OpenWrite](https://github.com/OPENWRITE-editor/openwrite) — a modern WYSIWYG editor for React & Next.js.

Built with [VitePress](https://vitepress.dev).

## Getting started

```bash
npm install
npm run docs:dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run docs:dev` | Start local dev server |
| `npm run docs:build` | Build for production |
| `npm run docs:preview` | Preview the production build |

## Project structure

```
.vitepress/
  config.ts          # Site configuration, nav, sidebar, Vite plugin
  theme/
    index.ts         # Custom theme entry (registers components)
    PlaygroundEmbed.vue  # Full-page iframe for the playground
    custom.css       # Style overrides
public/
  favicon.ico
  openwrite-logo.svg
  playground.html    # Entry point for the embedded demo
guide/               # Guide pages
api/                 # API reference pages
playground.md        # Playground page
```

## Playground

The playground embeds the built demo from `../openwrite/demo-dist/`.  
After rebuilding the demo, update the asset filenames in `public/playground.html` if they have changed.

To rebuild the demo:

```bash
cd ../openwrite
npx vite build --config vite.demo.config.ts
```
