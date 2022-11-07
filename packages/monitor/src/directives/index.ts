import { App } from 'vue'
const directives = require.context('./', true, /\.ts/)

export default function installdirectives (app: App) {
  directives.keys().forEach(key => {
    if (key === './index.ts') return
    if (typeof directives(key).default == 'function') {
      directives(key).default(app)
    }
  })
}