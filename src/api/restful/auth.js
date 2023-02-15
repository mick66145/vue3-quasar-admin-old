import Resource from './resource'
import request from '@/utils/request'

class AuthResource extends Resource {
  constructor () {
    super('user')
  }

  async login (params) {
    return await request({
      url: `/${this.uri}/login`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async register (params) {
    return await request({
      url: `/${this.uri}/register`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  async logout () {
    return await request({
      url: `/${this.uri}/logout`,
      method: 'post',
    })
  }
}

export default AuthResource
