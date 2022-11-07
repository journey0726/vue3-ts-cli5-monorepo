import { RouteRecordRaw } from 'vue-router'
import { roleLevel } from '@monitor/common/constant/role'

const HomeRouter: Array<RouteRecordRaw> = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@monitor/views/home/index.vue'),
    meta: {
      title: '个人中心',
      // role: [roleLevel.LEVEL_3]
    }
  }
]

export default HomeRouter
