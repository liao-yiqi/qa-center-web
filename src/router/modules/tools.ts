import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const toolsRouter: RouteRecordRaw[] = [
  {
    path: '/tools',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'toolsInfo',
        component: () => import('@/views/tools/index.vue'),
        name: 'Tools',
        meta: { title: 'Tools', icon: 'tool' },
      },
    ],
  },
]

export default toolsRouter
