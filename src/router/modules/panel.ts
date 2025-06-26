import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const panelRouter: RouteRecordRaw[] = [
  {
    path: '/panel',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'panelDetail',
        component: () => import('@/views/panel/index.vue'),
        hidden: true,
        name: 'panelDetail',
        meta: { title: 'PanelDetail' },
      },
    ],
  },
]

export default panelRouter
