import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@monitor/layout/index.vue'

const constantFiles = require.context('./constantModules', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

const asyncFiles = require.context('./permissionModules', true, /\.ts$/)
let permissionModules: Array<RouteRecordRaw> = []
asyncFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  permissionModules = permissionModules.concat(asyncFiles(key).default)
})

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/platform'
  },
  {
    path: '/platform',
    name: 'platform',
    component: Layout,
    meta: {
      title: '首页'
    }
  },
  ...constantModules,
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...permissionModules
]

const NewRouter = () => createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

const router = NewRouter()

export const resetRouter = () => {
  const newRouter = NewRouter();
  (router as any).matcher = (newRouter as any).matcher 
}

export const addRouterToParent = (addRouters: RouteRecordRaw[], parentName?: string | null) => {
  addRouters.forEach(addRouter => {
    parentName == null ? router.addRoute(addRouter) : router.addRoute(parentName, addRouter)
  })
}

export default router
