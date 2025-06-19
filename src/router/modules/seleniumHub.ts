import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const seleniumHubRouter: RouteRecordRaw[] = [
  {
    path: '/seleniumHub',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'seleniumHubInfo',
        component: () => import('@/views/seleniumHub/index.vue'),
        name: 'SeleniumHub',
        meta: { title: 'SeleniumHub', icon: 'tool' },
      },
    ],
  },
]

export default seleniumHubRouter
