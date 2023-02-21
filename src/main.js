import { createApp } from 'vue'
import { createPinia } from 'pinia'

import quasar from '@/plugins/quasar'

// windi
import 'virtual:windi.css'
import App from './App.vue'
import router from './router'
import GlobalComponents from './components'
import 'virtual:svg-icons-register'

// plugins
import { useDayjs } from '@/plugins/dayjs'
import vxeTable from '@/plugins/vxe-table'
import editor from '@/plugins/editor'
import i18n from '@/plugins/i18n'
import { useVuelidate } from '@/plugins/vuelidate'

import '@/styles/index.scss'

// directive
import permission from '@/directive/permission'
import downLoadUrl from '@/directive/download-url'

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
app.use(downLoadUrl)
app.mount('#app')
