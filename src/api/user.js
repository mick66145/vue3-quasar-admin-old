import Resource from './resource'
import request from '@/utils/request'

class UserResource extends Resource {
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

  getInfo (query) {
    return request({
      url: `/${this.uri}/info`,
      method: 'get',
      params: query,
    }).then(res => res.data)
  }
}

export default UserResource
