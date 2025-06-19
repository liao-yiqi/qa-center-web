import session from '@/utils/hsj/useSession'
import { defineStore } from 'pinia'
import { RouteRecordRaw, Router } from 'vue-router'
const ROUTE_STORAGE_KEY = 'ROUTER_STORE'

const useRoutes = defineStore(
  'routes',
  () => {
    const routerInfo = ref<RouteRecordRaw[]>([])

    const addRouter = (routes: RouteRecordRaw[], router: Router) => {
      /* const newRoutes = routes
        .map((route) => {
          const children = route.children || []
          const hasNewChild = children.some(
            (child) =>
              child.name && !addedRouteNames.includes(child.name as string)
          )
          return hasNewChild ? route : null
        })
        .filter(Boolean) as typeof routerInfo

      newRoutes.forEach((route) => {
        router.addRoute(route)
      }) */

      /* const allAddedNames = [
        ...addedRouteNames,
        ...newRoutes.flatMap((r) => r.children?.map((c) => c.name) || []),
      ]
      session.set(ROUTE_STORAGE_KEY, JSON.stringify(allAddedNames)) */
    }

    return {
      routerInfo,
      addRouter,
    }
  },
  {
    persist: {
      key: ROUTE_STORAGE_KEY,
      storage: sessionStorage,
    },
  }
)

export default useRoutes
