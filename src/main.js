import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'

// quasar
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

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
import './permission'

import { setupProdMockServer } from '../server/mock'

if (import.meta.env === 'development') {
  setupProdMockServer()
}

const app = createApp(App)
app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {},
  },
})
app.use(createPinia())
app.use(router)
app.use(GlobalComponents)

app.use(useDayjs)
app.use(vxeTable)
app.use(editor)
app.use(i18n)
app.use(useVuelidate)
app.mount('#app')
