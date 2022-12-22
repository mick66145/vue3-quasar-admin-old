/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyRouter = {
  path: '/company',
  name: 'Company',
  component: MainLayout,
  meta: {
    title: 'company',
  },
  redirect: { name: 'CompanyList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company/CompanyList.vue'),
      name: 'CompanyList',
      meta: { title: 'company', icon: '', affix: true },
    },
    {
      path: 'create',
      component: () => import('@/views/company/CompanyCreate.vue'),
      name: 'CompanyCreate',
      meta: { title: '新增公司', icon: '' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/company/CompanyEdit.vue'),
      name: 'CompanyEdit',
      meta: { title: '編輯公司' },
      hidden: true,
    },
  ],
}

export default companyRouter
