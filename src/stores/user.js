import UserResource from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const userResource = new UserResource()

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    account: '',
    email: '',
    phone: '',
    role: '',
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
            const { role, name, account, email, phone } = data
            // roles must be a non-empty array
            if (!role || role.length <= 0) {
              reject(new Error('getInfo: roles must be a non-null array!'))
            }
            this.name = name
            this.account = account
            this.email = email
            this.phone = phone
            this.role = role
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
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
