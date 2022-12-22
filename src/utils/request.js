import Configuration from '@/configuration'
import axios from 'axios'
import errorHandle from './error-handle'
import { useUser } from '@/stores/user'
import { getToken } from '@/utils/auth'

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
  response => {
    return response
  },
  error => {
    const { response } = error
    if (response) {
      let message = error.message
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      } else if (error.response.data && error.response.data.errors) {
        message = error.response.data.errors
      } else if (error.response.data && error.response.data.error) {
        message = error.response.data.error
      }
      // receive the response, but has error
      errorHandle(response.status, message)
      return Promise.reject(error)
    }

    // can not receive response
    // 請求過時或者是斷網
    if (!window.navigator.onLine) {
      // Message(
      //   {
      //     showClose: true,
      //     duration: 0,
      //     message: '網絡有些問題。請重新加載',
      //     type: 'error',
      //   },
      // )
    } else {
      // maybe Program have some problem
      return Promise.reject(error)
    }
  },
)

export default service
