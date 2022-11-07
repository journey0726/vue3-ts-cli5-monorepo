import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installPlugins from './plugins/index'
import registerDirectives from './directives/index'

import '@monitor/common/role'
import './style/global.css'
const app = createApp(App)

installPlugins(app)
registerDirectives(app)
app.use(router).use(store).mount('#app')
