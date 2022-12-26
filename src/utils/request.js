import Configuration from '@/configuration'
import axios from 'axios'
import { useUser } from '@/stores/user'
import { getToken } from '@/utils/auth'
import useNotify from '@/use/useNotify'
import { useAsyncState } from '@vueuse/core'
import router from '@/router'

export const handleError = (error) => {
  const { response } = error
  const { notifyAPIError } = useNotify()
  if (response) {
    return Promise.reject(error)
  }

  // can not receive response
  // 請求過時或者是斷網
  if (!window.navigator.onLine) {
    notifyAPIError({ message: '網絡有些問題。請重新加載' })
  } else {
    // maybe Program have some problem
    return Promise.reject(error)
  }
}

export const handleAuthError = async (error) => {
  const { status } = error.response
  const store = useUser()
  if (status !== 401) return Promise.reject(error)
  const reqLogout = useAsyncState(store.logout
    , {}, { immediate: false })
  await reqLogout.execute(0)
    .then(() => {
      const path = window.location.pathname + window.location.search
      router.replace({ name: 'Login', query: { redirect: path.includes('/login') ? undefined : path } })
      router.push(`/login?redirect=${router.fullPath}`)
    })
  return Promise.reject(error)
}

// create an axios instance
const service = axios.create({
  baseURL: `${Configuration('backendHost')}`, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const storeUser = useUser()
    if (storeUser.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => response,
  handleError,
)

service.interceptors.response.use(
  response => response,
  handleAuthError,
)

export default service
