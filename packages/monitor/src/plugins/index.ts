import { App } from 'vue'
const plugins = require.context('./', true, /\.ts/)

export default function installPlugins (app: App) {
  plugins.keys().forEach(key => {
    if (key === './index.ts') return
    if (typeof plugins(key).default == 'function') {
      plugins(key).default(app)
    }
  })
}