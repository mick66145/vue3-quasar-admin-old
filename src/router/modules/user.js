/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const userRouter = {
  path: '/user',
  name: 'user',
  component: MainLayout,
  meta: {
    title: '帳號維護',
    permissions: ['view user'],
  },
  redirect: { name: 'UserList' },
  children: [
    {
      path: '',
      component: () => import('@/views/user/UserList.vue'),
      name: 'UserList',
      meta: { title: '帳號維護', permissions: ['view user'] },
    },
    {
      path: 'create',
      component: () => import('@/views/user/UserCreate.vue'),
      name: 'UserCreate',
      meta: { title: '帳號詳情', permissions: ['create user'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/user/UserEdit.vue'),
      name: 'UserEdit',
      meta: { title: '帳號詳情', permissions: ['update user'] },
      hidden: true,
    },
  ],
}

export default userRouter
