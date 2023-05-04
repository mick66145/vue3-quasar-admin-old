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
  ],
}

export default companyJobRouter
