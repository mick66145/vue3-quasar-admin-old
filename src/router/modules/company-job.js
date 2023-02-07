/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyJobRouter = {
  path: '/company-job',
  name: 'CompanyJob',
  component: MainLayout,
  meta: {
    title: '職稱維護',
    slug: 'link',
    permissions: ['view company_job'],
  },
  redirect: { name: 'CompanyJobList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company-job/CompanyJobList.vue'),
      name: 'CompanyJobList',
      meta: { title: '職稱維護', icon: 'fas fa-genderless', permissions: ['view company_job'] },
    },
    {
      path: 'create',
      component: () => import('@/views/company-job/CompanyJobCreate.vue'),
      name: 'CompanyJobCreate',
      meta: { title: '職稱詳情', permissions: ['create company_job'] },
      hidden: true,
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/company-job/CompanyJobEdit.vue'),
      name: 'CompanyJobEdit',
      meta: { title: '職稱詳情', permissions: ['update company_job'] },
      hidden: true,
    },
  ],
}

export default companyJobRouter
