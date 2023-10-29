import { createRouter, createWebHistory } from 'vue-router'

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

/* Router Modules */
import companyRouter from './modules/company'
import companyJobRouter from './modules/company-job'
import userRouter from './modules/user'
import roleRouter from './modules/role'
import mailinfoRouter from './modules/mailinfo'
import systemLogRouter from './modules/system-log'
import mailLogRouter from './modules/mail-log'
import basicSettingRouter from './modules/basic-setting'

export const constantRoutes = [
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
    component: () => import('@/views/entry/login/Login.vue'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/entry/register/Register.vue'),
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
    meta: {
      slug: 'link',
    },
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
]

export const asyncRoutes = [
  {
    path: '/',
    group: ['/mailinfo'],
    groupName: 'first',
    meta: {
      title: 'meun.system-information-manage',
      icon: 'menu_open',
      slug: 'dropdown',
    },
    children: [
      mailinfoRouter,
    ],
  },
  {
    path: '/',
    group: ['/company-job', '/company', '/role', '/user'],
    groupName: 'first',
    meta: {
      title: 'meun.user-manage',
      icon: 'menu_open',
      slug: 'dropdown',
    },
    children: [
      companyRouter,
      companyJobRouter,
      roleRouter,
      userRouter,
    ],
  },
  basicSettingRouter,
  {
    path: '/',
    group: ['/system-log', '/mail-log'],
    groupName: 'first',
    meta: {
      title: 'meun.system-log',
      icon: 'menu_open',
      slug: 'dropdown',
    },
    children: [
      systemLogRouter,
      mailLogRouter,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
})

export function addRoutes (routes = [], { parent = '' }) {
  routes.forEach(route => {
    if (parent) {
      router.addRoute(parent, route)
    } else {
      router.addRoute(route)
    }
  })
}

export default router
