import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { beforeEach, afterEach } from './routerInterceptor'
import Layout from '@/layout/index.vue'
import usersRouter from './modules/users'
import toolsRouter from './modules/tools'
import seleniumHubRouter from './modules/seleniumHub'
import reportCenterRouter from './modules/reportCenter'
import settingRouter from './modules/setting'
import panelRouter from './modules/panel'

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true,
  },
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes: RouteRecordRaw[] = []

// 模块路由
export const modulesRouter: RouteRecordRaw[] = [
  ...toolsRouter,
  ...seleniumHubRouter,
  ...reportCenterRouter,
  ...usersRouter,
  ...settingRouter,
]

// 详情路由
export const detailsRouter: RouteRecordRaw[] = [...panelRouter]

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...modulesRouter, ...detailsRouter],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

beforeEach(router)
afterEach(router)
export default router
