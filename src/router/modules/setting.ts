import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const settingRouter: RouteRecordRaw[] = [
  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'settingInfo',
        component: () => import('@/views/setting/index.vue'),
        name: 'setting',
        meta: { title: 'Setting', icon: 'system' },
      },
    ],
  },
]

export default settingRouter
