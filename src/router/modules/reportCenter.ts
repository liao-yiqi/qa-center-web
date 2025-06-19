import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const reportCenterRouter: RouteRecordRaw[] = [
  {
    path: '/reportCenter',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'reportCenterInfo',
        component: () => import('@/views/reportCenter/index.vue'),
        name: 'reportCenter',
        meta: { title: 'ReportCenter', icon: 'tool' },
      },
    ],
  },
]

export default reportCenterRouter
