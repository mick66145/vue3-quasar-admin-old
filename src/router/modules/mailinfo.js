/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const mailinfoRouter = {
  path: '/mailinfo',
  name: 'Mailinfo',
  component: MainLayout,
  meta: {
    title: '信件維護',
    slug: 'link',
  },
  redirect: { name: 'MailinfoList' },
  children: [
    {
      path: '',
      component: () => import('@/views/mailinfo/MailinfoList.vue'),
      name: 'MailinfoList',
      meta: { title: '信件維護', icon: 'fas fa-genderless', affix: true },
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/mailinfo/MailinfoEdit.vue'),
      name: 'MailinfoEdit',
      meta: { title: '信件詳情' },
      hidden: true,
    },
  ],
}

export default mailinfoRouter
