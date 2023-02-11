import { createApp } from 'vue'
import { createPinia } from 'pinia'

import quasar from '@/plugins/quasar'

// windi
import 'virtual:windi.css'

import App from './App.vue'
import router from './router'
import { useDayjs } from '@/plugins/dayjs'
import GlobalComponents from './components'

import 'virtual:svg-icons-register'

// vxe-table
import vxeTable from '@/plugins/vxe-table'

import editor from '@/plugins/editor'

import '@/styles/index.scss'

import i18n from '@/plugins/i18n'
import { useVuelidate } from '@/plugins/vuelidate'
import permission from '@/directive/permission'
import './permission'

import { setupProdMockServer } from '../server/mock'

if (import.meta.env === 'development') {
  setupProdMockServer()
}

const app = createApp(App)
app.use(quasar)
app.use(createPinia())
app.use(router)
app.use(GlobalComponents)

app.use(useDayjs)
app.use(editor)
app.use(i18n)
app.use(vxeTable)
app.use(useVuelidate)
app.use(permission)
app.mount('#app')
