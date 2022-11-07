import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { RouteLocationNormalized } from 'vue-router'
import router, { addRouterToParent } from '@monitor/router'

import { useAuthority } from '@monitor/store/modules/authority'
import { useRoles } from '@monitor/store/modules/roles'

NProgress.configure({ showSpinner: false })


router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
  NProgress.start()
  // console.log(router.getRoutes());
  
  const { role } = useRoles()
  if (role.isLogin) {
    if (to.path === '/login') {
      next({path: '/platform'})
    } else {
      const { getCanUseRouter, readyUseRouters, setReadyUseRouters } = useAuthority()

      if (readyUseRouters.length == 0) { // 异步路由中 当前准备好的路由
        if(getCanUseRouter().length == 0) {  // 能够使用的路由
          if (to.matched.length == 0) {
            next('/error/404')
          } else {
            next()
          }
        } else {
          addRouterToParent(getCanUseRouter(), 'platform')
          setReadyUseRouters(getCanUseRouter())
          next({ ...to, replace: true })
          
        }
      } else {
        if (to.matched.length == 0) {
          next('/error/404')
        } else {
          next()
        }
      }
    }
  } else {
    if (to.fullPath == '/login') {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
  document.title = to.meta.title
})
