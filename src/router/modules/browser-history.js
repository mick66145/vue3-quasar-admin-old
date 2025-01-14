/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const browserHistoryRouter = {
  path: '/browser-history',
  component: MainLayout,
  meta: {
    title: 'browser-history.title',
    slug: 'link',
  },
  redirect: { name: 'BrowserHistoryReport' },
  children: [
    {
      path: 'browser-history-report',
      component: () => import('@/views/browser-history/browser-history-report/BrowserHistoryReport.vue'),
      name: 'BrowserHistoryReport',
      meta: { title: 'browser-history-report.title', icon: 'fas fa-genderless' },
    },
  ],
}

export default browserHistoryRouter
