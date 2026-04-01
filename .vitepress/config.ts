import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const demoAssetsDir = path.resolve(__dirname, '../../openwrite/demo-dist/assets')

function playgroundPlugin() {
  return {
    name: 'openwrite-playground',

    // Dev: serve demo-dist assets at /assets/
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url: string = (req.url ?? '').split('?')[0]
        if (url.startsWith('/assets/')) {
          const filename = url.slice('/assets/'.length)
          const filePath = path.join(demoAssetsDir, filename)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const mimeTypes: Record<string, string> = {
              '.js': 'application/javascript',
              '.css': 'text/css',
              '.woff2': 'font/woff2',
              '.woff': 'font/woff',
              '.ttf': 'font/ttf',
            }
            const ext = path.extname(filePath)
            res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream')
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },

    // Build: copy demo assets into public/assets/ before bundling
    buildStart() {
      if (!fs.existsSync(demoAssetsDir)) {
        console.warn('[openwrite-playground] demo-dist/assets not found, skipping copy.')
        return
      }
      const destDir = path.resolve(__dirname, '../public/assets')
      fs.mkdirSync(destDir, { recursive: true })
      for (const file of fs.readdirSync(demoAssetsDir)) {
        const src = path.join(demoAssetsDir, file)
        const dest = path.join(destDir, file)
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(src, dest)
        }
      }
    },
  }
}

export default defineConfig({
  title: 'OpenWrite',
  description: 'Modern WYSIWYG editor for React & Next.js',
  lang: 'en-US',

  head: [
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'OpenWrite — WYSIWYG Editor for React & Next.js' }],
    ['meta', { name: 'og:description', content: 'Modern, extensible WYSIWYG editor for React and Next.js with 40+ toolbar items, plugin system, dark mode, i18n, and import/export.' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: { src: '/openwrite-logo.svg', alt: 'OpenWrite' },
    siteTitle: false,

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API Reference', link: '/api/editor-props', activeMatch: '/api/' },
      { text: 'Playground', link: '/playground', activeMatch: '/playground' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/your-org/openwrite/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/your-org/openwrite/blob/main/CONTRIBUTING.md' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Toolbar', link: '/guide/toolbar' },
            { text: 'Themes', link: '/guide/theming' },
            { text: 'Floating Toolbar', link: '/guide/floating-toolbar' },
            { text: 'Word Count', link: '/guide/word-count' },
            { text: 'Internationalization', link: '/guide/i18n' },
            { text: 'Import & Export', link: '/guide/import-export' },
            { text: 'Plugin System', link: '/guide/plugins' },
            { text: 'Next.js', link: '/guide/nextjs' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'EditorProps', link: '/api/editor-props' },
            { text: 'EditorRef', link: '/api/editor-ref' },
            { text: 'Toolbar Config', link: '/api/toolbar-config' },
            { text: 'Plugin System', link: '/api/plugin-system' },
            { text: 'Types', link: '/api/types' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/OPENWRITE-editor/openwrite' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/openwrite' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present OpenWrite Contributors',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },

  vite: {
    plugins: [playgroundPlugin()],
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },
})
