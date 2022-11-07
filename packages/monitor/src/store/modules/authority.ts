import { ref, toRefs } from 'vue'
import { defineStore } from 'pinia'

import { RouteRecordRaw } from 'vue-router'
import { useRoles } from './roles'
import { asyncRoutes, resetRouter as ResetRouter } from '@monitor/router/index'

const id = 'authority'

export const useAuthority = defineStore(
  id,
  () => {
    const { role } = toRefs(useRoles())

    let canUseRouters = ref<RouteRecordRaw[]>([]) //当前用户能使用的路由
    let isFilterRouter = ref(false) // 是否已经过滤了路由

    const getCanUseRouter = () => {
      if (!isFilterRouter.value) {
        canUseRouters.value = filterAsyncRouters(asyncRoutes, role.value.level || [])
        isFilterRouter.value = true
      }
      return canUseRouters.value
    }
    const resetRouter = () => {
      canUseRouters.value = []
      isFilterRouter.value = false
      ResetRouter()
    }

    let readyUseRouters = ref<RouteRecordRaw[]>([]) // 当前用户已经准备好使用的路由

    const setReadyUseRouters = (routers: RouteRecordRaw[]) => {
      readyUseRouters.value = routers
    }

    return {
      canUseRouters,
      resetRouter,
      getCanUseRouter,
      readyUseRouters,
      setReadyUseRouters,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ['canUseRouters'],
        },
      ],
    },
  }
)

// 如果没有配置用户权限 或者 没有配置路由权限，则默认能访问
const checkAuthority = (userLevel: number[], routerLevel: number[]) => {
  if (userLevel.length == 0 || routerLevel.length == 0) return true
  const ULevel = userLevel.reduce((prev, next) => prev | next, 0)
  const RLevel = routerLevel.reduce((prev, next) => prev | next, 0)
  return ULevel & RLevel
}

const filterAsyncRouters = (routers: RouteRecordRaw[], userLevel: number[]) => {
  const res: RouteRecordRaw[] = []
  routers.forEach((router) => {
    const r = { ...router }
    if (checkAuthority(userLevel, router.meta?.role || [])) {
      if (r.children) {
        r.children = filterAsyncRouters(r.children, userLevel)
      }
      res.push(r)
    }
  })
  return res
}
