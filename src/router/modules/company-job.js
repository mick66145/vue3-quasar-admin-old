/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const companyJobRouter = {
  path: '/company-job',
  name: 'CompanyJob',
  component: MainLayout,
  meta: {
    title: 'companyJob',
  },
  redirect: { name: 'CompanyJobList' },
  children: [
    {
      path: '',
      component: () => import('@/views/company-job/CompanyJobList.vue'),
      name: 'CompanyJobList',
      meta: { title: 'companyJob' },
    },
  ],
}

export default companyJobRouter
