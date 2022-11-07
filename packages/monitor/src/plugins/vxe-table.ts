import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { App } from 'vue'

export default (app: App) => {
  app.use(VXETable )
}