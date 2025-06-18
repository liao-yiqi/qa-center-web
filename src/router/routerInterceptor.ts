import loading from '@/utils/loading'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user.ts'
import usePermissionStore from '@/store/modules/permission'
import NProgress from 'nprogress'
import { Router } from 'vue-router'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/register']
export const beforeEach = (router: Router) => {
  router.beforeEach((to, _from, next) => {
    NProgress.start()
    if (!window.existLoading) {
      loading.show()
      window.existLoading = true
    }
    document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE
    const permissionStore = usePermissionStore()
    if (permissionStore.routes.length === 0) {
      permissionStore.generateRoutes()
    }
    next()
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
