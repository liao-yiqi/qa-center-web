// import { ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'
import type { Router } from 'vue-router'
import loading from '@/utils/loading.ts'

NProgress.configure({ showSpinner: true })
// const whiteList = ['/login', '/register']
export const beforeEach = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (!window.existLoading) {
      window.existLoading = true
      loading.show()
    }
    /* if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login?redirect=' + to.fullPath)
    } */
    next()
  })
}

export const afterEach = (router: Router) => {
  router.afterEach((): void => {
    if (window.existLoading) {
      loading.hide()
    }
    NProgress.done()
  })
}
