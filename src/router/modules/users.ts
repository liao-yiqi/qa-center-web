import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const usersRoter: RouteRecordRaw[] = [
  {
    path: '/users',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'usersInfo',
        component: () => import('@/views/users/index.vue'),
        name: 'Users',
        meta: { title: 'Users', icon: 'user' },
      },
    ],
  },
]

export default usersRoter
