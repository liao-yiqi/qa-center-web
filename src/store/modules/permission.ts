import type { RouteRecordRaw } from 'vue-router'
import router, { constantRoutes, moduleRoutes } from '@/router/index'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'

// 预加载 views 目录所有 vue 组件
const modules = import.meta.glob('./../../views/**/*.vue')

interface PermiState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
  defaultRoutes: RouteRecordRaw[]
  topbarRouters: RouteRecordRaw[]
  sidebarRouters: RouteRecordRaw[]
}

const usePermissionStore = defineStore('permission', {
  state: (): PermiState => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    setDefaultRoutes(routes: RouteRecordRaw[]) {
      this.defaultRoutes = constantRoutes.concat(routes)
    },
    setTopbarRoutes(routes: RouteRecordRaw[]) {
      this.topbarRouters = routes
    },
    setSidebarRouters(routes: RouteRecordRaw[]) {
      this.sidebarRouters = routes
    },
    generateRoutes() {
      return new Promise<RouteRecordRaw[]>((resolve) => {
        const stateRoute = [...constantRoutes, ...moduleRoutes]
        this.setRoutes(stateRoute)
        this.setSidebarRouters(stateRoute)
        resolve(constantRoutes)
      })
    },
  },
})

// 过滤路由，把字符串组件替换成真正的组件
function filterAsyncRouter(
  asyncRouterMap: RouteRecordRaw[],
  type = false
): RouteRecordRaw[] {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // @ts-ignore
      if (route.component === 'Layout') {
        // @ts-ignore
        route.component = Layout
        // @ts-ignore
      } else if (route.component === 'ParentView') {
        // @ts-ignore
        route.component = ParentView
        // @ts-ignore
      } else if (route.component === 'InnerLink') {
        // @ts-ignore
        route.component = InnerLink
      } else {
        // @ts-ignore
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(
  children: RouteRecordRaw[],
  lastRouter?: RouteRecordRaw
): RouteRecordRaw[] {
  let childrenRoutes: RouteRecordRaw[] = []
  children.forEach((child) => {
    if (child.children && child.children.length) {
      // @ts-ignore
      if (child.component === 'ParentView' && !lastRouter) {
        // @ts-ignore
        child.children.forEach((c) => {
          // @ts-ignore
          c.path = child.path + '/' + c.path
          if (c.children && c.children.length) {
            childrenRoutes = childrenRoutes.concat(
              filterChildren(c.children, c)
            )
            return
          }
          childrenRoutes.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      child.path = lastRouter.path + '/' + child.path
      if (child.children && child.children.length) {
        childrenRoutes = childrenRoutes.concat(
          filterChildren(child.children, child)
        )
        return
      }
    }
    childrenRoutes.push(child)
  })
  return childrenRoutes
}

const loadView = (view: string) => {
  let res: any = null
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default usePermissionStore
