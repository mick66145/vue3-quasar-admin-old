/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyRouter = {
  path: '/company',
  name: 'Company',
  component: MainLayout,
  meta: {
    title: 'company.title',
    slug: 'link',
  },
  redirect: { name: 'CompanyList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company/CompanyList.vue'),
      name: 'CompanyList',
      meta: { title: 'company.title', icon: 'fas fa-genderless', affix: true },
    },
    {
      path: 'create',
      component: () => import('@/views/company/CompanyCreate.vue'),
      name: 'CompanyCreate',
      meta: { title: '公司詳情' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/company/CompanyEdit.vue'),
      name: 'CompanyEdit',
      meta: { title: '公司詳情' },
      hidden: true,
    },
  ],
}

export default companyRouter
