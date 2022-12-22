import UserResource from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const userResource = new UserResource()

export const useUser = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
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

    getInfo () {
      const payload = {
        token: this.token,
      }
      return new Promise((resolve, reject) => {
        userResource.getInfo(payload)
          .then(res => {
            const { data } = res
            if (!data) {
              reject(new Error('Verification failed, please Login again.'))
            }
            const { roles, name, avatar, introduction } = data
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject(new Error('getInfo: roles must be a non-null array!'))
            }
            this.roles = roles
            this.name = name
            this.avatar = avatar
            this.introduction = introduction
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    },

    logout () {
      return new Promise((resolve, reject) => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    },

    setToken (token) {
      setToken(token)
      this.token = token
    },
  },

})
