import mitt from 'mitt'
import { App } from 'vue'
const mitter = mitt()

const install = function (app: App) {
  app.config.globalProperties.$bus = mitter
}

export default install