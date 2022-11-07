import { RouteRecordRaw } from 'vue-router'

const LoginRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@monitor/views/login/index.vue')
  }
]

export default LoginRouter