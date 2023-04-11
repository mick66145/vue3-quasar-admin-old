/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const mailLogRouter = {
  path: '/mail-log',
  component: MainLayout,
  meta: {
    title: '信件紀錄',
    slug: 'link',
    permissions: ['view mail_log'],
  },
  redirect: { name: 'MailLogList' },
  children: [
    {
      path: '',
      component: () => import('@/views/mail-log/MailLogList.vue'),
      name: 'MailLogList',
      meta: { title: '信件紀錄', icon: 'fas fa-genderless', permissions: ['view mail_log'] },
    },
  ],
}

export default mailLogRouter
