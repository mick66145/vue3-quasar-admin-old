import { Quasar, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

export default {
  install (app) {
    app.use(Quasar, {
      plugins: {
        Notify,
      },
      config: {
        notify: {},
      },
    })
  },
}
