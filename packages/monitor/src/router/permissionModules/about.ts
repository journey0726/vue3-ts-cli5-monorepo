import { RouteRecordRaw } from 'vue-router'
import { roleLevel } from '@monitor/common/constant/role'

const HomeRouter: Array<RouteRecordRaw> = [
  {
    path: 'about',
    name: 'about',
    component: () => import('@monitor/views/about/index.vue'),
    meta: {
      title: '关于',
      // role: [roleLevel.LEVEL_3]
    }
  }
]

export default HomeRouter
