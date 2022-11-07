import { App } from 'vue'
import Antd from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.variable.min.css'
import aDraggableModal from '@share/components/draggable-modal/Index.vue'

export default (app: App) => {
  app.use(Antd)
  Object.keys(Icons).forEach((key) => {
    app.component(key, (Icons as any)[key])
  })
  app.component('a-drag-modal', aDraggableModal)
}
