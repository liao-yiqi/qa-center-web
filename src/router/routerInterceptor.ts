import loading from '@/utils/loading'
import usePermissionStore from '@/store/modules/permission'
import NProgress from 'nprogress'
import { Router } from 'vue-router'
NProgress.configure({ showSpinner: false })
// const whiteList = ['/login', '/register']
export const beforeEach = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    if (!window.existLoading) {
      loading.show()
      window.existLoading = true
    }
    document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE
    const permissionStore = usePermissionStore()
    if (permissionStore.routes.length === 0) {
      await permissionStore.generateRoutes()
      // 确保路由已经加在完成
      permissionStore.routesLoaded = true
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    } else {
      next()
    }
  })
}
export const afterEach = (router: Router) => {
  router.afterEach(() => {
    if (window.existLoading) {
      loading.hide()
    }
    NProgress.done()
  })
}
