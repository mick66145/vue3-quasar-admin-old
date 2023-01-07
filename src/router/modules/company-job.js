/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyJobRouter = {
  path: '/company-job',
  name: 'CompanyJob',
  component: MainLayout,
  meta: {
    title: '職稱維護',
  },
  redirect: { name: 'CompanyJobList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company-job/CompanyJobList.vue'),
      name: 'CompanyJobList',
      meta: { title: '職稱維護' },
    },
    {
      path: 'create',
      component: () => import('@/views/company-job/CompanyJobCreate.vue'),
      name: 'CompanyJobCreate',
      meta: { title: '職稱詳情' },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/company-job/CompanyJobEdit.vue'),
      name: 'CompanyJobEdit',
      meta: { title: '職稱詳情' },
      hidden: true,
    },
  ],
}

export default companyJobRouter
