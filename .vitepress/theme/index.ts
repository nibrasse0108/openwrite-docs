import DefaultTheme from 'vitepress/theme'
import PlaygroundEmbed from './PlaygroundEmbed.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('PlaygroundEmbed', PlaygroundEmbed)
  },
}
