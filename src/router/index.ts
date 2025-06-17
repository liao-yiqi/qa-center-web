import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { afterEach, beforeEach } from './routerInterceptor'
import usersRouter from './modules/user'
// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
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

// 模块路由
export const moduleRoutes: RouteRecordRaw[] = [...usersRouter]

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...moduleRoutes],
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
