import UserResource from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const userResource = new UserResource()

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    info: '',
    permissionList: [],
  }),
  actions: {

    login (payload) {
      return userResource.login(payload)
        .then(res => {
          const { data } = res
          this.setToken(data.token)
          return res
        })
    },

    whoami () {
      return new Promise((resolve, reject) => {
        userResource.whoami()
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
        userResource.permission()
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
      return userResource.profile(payload)
    },

    logout () {
      this.token = ''
      removeToken()
      this.$reset()
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },
  },

})
