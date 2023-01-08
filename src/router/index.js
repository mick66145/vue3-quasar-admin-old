import { createRouter, createWebHistory } from 'vue-router'

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

/* Router Modules */
import companyRouter from './modules/company'
import companyJobRouter from './modules/company-job'
import userRouter from './modules/user'
import roleRouter from './modules/role'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/redirect',
      component: MainLayout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect/index.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/error-page/404.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
      hidden: true,
    },
    {
      path: '/404',
      component: () => import('@/views/error-page/404.vue'),
      hidden: true,
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard.vue'),
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard' },
        },
      ],
    },
    {
      path: '/profile',
      component: MainLayout,
      redirect: '/profile',
      hidden: true,
      children: [
        {
          path: '',
          component: () => import('@/views/profile/Profile.vue'),
          name: 'Profile',
          meta: { title: '個人資料' },
        },
      ],
    },
    companyRouter,
    companyJobRouter,
    userRouter,
    roleRouter,
  ],
})

export default router
