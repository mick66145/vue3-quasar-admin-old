import Resource from './resource'
import request from '@/utils/request'
import { PlatformAttribute } from '@/class'

class PlatformAttributeResource extends Resource {
  constructor () {
    super('platform_attribute')
  }

  async get (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const platformAttributeObj = new PlatformAttribute({
          ...res.data,
        })
        return platformAttributeObj
      })
  }
}

export default PlatformAttributeResource
