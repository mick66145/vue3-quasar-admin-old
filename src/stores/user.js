import { UserResource, AuthResource } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    permissionList: [],
    userResource: new UserResource(),
    authResource: new AuthResource(),
  }),
  actions: {

    login (payload) {
      return this.authResource.login(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },

    whoami () {
      return new Promise((resolve, reject) => {
        this.userResource.whoami()
          .then(res => {
            const { data } = res
            if (!data) {
              reject(new Error('Verification failed, please Login again.'))
            }
            this.info = { ...data }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    },

    permission () {
      return new Promise((resolve, reject) => {
        this.userResource.permission()
          .then(res => {
            const { list } = res
            this.permissionList = list
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    profile (payload) {
      return this.userResource.profile(payload)
    },

    logout () {
      /* 如果有登出的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   return authResource.logout().then(res => {
      //     this.clear()
      //     resolve()
      //   })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
      this.clear()
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },

    clear () {
      this.token = ''
      removeToken()
      this.$reset()
    },
  },

})
