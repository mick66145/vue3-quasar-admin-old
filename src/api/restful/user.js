import Resource from './resource'
import request from '@/utils/request'
import { User } from '@/class'

class UserResource extends Resource {
  constructor () {
    super('user')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const userObj = new User(element)
          return userObj
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }

  async get (id, query) {
    return await request({
      url: `/${this.uri}/${id}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const userObj = new User({
          ...res.data,
        })
        return userObj
      })
  }

  async resetPassword (id) {
    return await request({
      url: `/${this.uri}/${id}/reset_password`,
      method: 'post',
    }).then(res => res.data)
  }

  async whoami () {
    return await request({
      url: '/whoami',
      method: 'get',
    }).then(res => res.data)
  }

  async permission () {
    return await request({
      url: '/whoami/permission',
      method: 'get',
    }).then(res => res.data)
      .then(res => {
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return {
            list: list,
          }
        }
      })
  }

  async profile (params) {
    return request({
      url: '/profile',
      method: 'patch',
      data: params,
    })
  }

  async changePassword (params) {
    return request({
      url: `/${this.uri}/change_password`,
      method: 'post',
      data: params,
    })
  }
}

export default UserResource
