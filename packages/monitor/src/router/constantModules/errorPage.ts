import { RouteRecordRaw } from 'vue-router'

const ErrorPage: Array<RouteRecordRaw> = [
  {
    path: '/error/404',
    name: 'errorPage',
    component: () => import('@monitor/views/errorPage/404.vue'),
    meta: {
      title: 'not found',
    }
  }
]

export default ErrorPage
