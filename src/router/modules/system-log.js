/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const systemLogRouter = {
  path: '/system-log',
  component: MainLayout,
  meta: {
    title: '操作紀錄',
    permissions: ['view system_log_manage'],
  },
  redirect: { name: 'SystemLogList' },
  children: [
    {
      path: '',
      component: () => import('@/views/system-log/SystemLogList.vue'),
      name: 'SystemLogList',
      meta: { title: '操作紀錄', permissions: ['view system_log_manage'] },
    },
  ],
}

export default systemLogRouter
