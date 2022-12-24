/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const userRouter = {
  path: '/user',
  name: 'user',
  component: MainLayout,
  meta: {
    title: 'user',
  },
  redirect: { name: 'UserList' },
  children: [
    {
      path: '',
      component: () => import('@/views/user/UserList.vue'),
      name: 'UserList',
      meta: { title: 'user' },
    },
    {
      path: 'create',
      component: () => import('@/views/user/UserCreate.vue'),
      name: 'UserCreate',
      meta: { title: '帳號詳情', icon: '' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/user/UserEdit.vue'),
      name: 'UserEdit',
      meta: { title: '帳號詳情' },
      hidden: true,
    },
  ],
}

export default userRouter
