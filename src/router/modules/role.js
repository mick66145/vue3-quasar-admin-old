/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const roleRouter = {
  path: '/role',
  name: 'Role',
  component: MainLayout,
  meta: {
    title: '權限維護',
  },
  redirect: { name: 'RoleList' },
  children: [
    {
      path: '',
      component: () => import('@/views/role/RoleList.vue'),
      name: 'RoleList',
      meta: { title: '權限維護' },
    },
    {
      path: 'create',
      component: () => import('@/views/role/RoleCreate.vue'),
      name: 'RoleCreate',
      meta: { title: '權限詳情' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/role/RoleEdit.vue'),
      name: 'RoleEdit',
      meta: { title: '權限詳情' },
      hidden: true,
    },
  ],
}

export default roleRouter
