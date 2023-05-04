import Resource from './resource'
import request from '@/utils/request'
import { Mailinfo } from '@/class'

class MailinfofoResource extends Resource {
  constructor () {
    super('mailinfo')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const mailinfoObj = new Mailinfo(element)
          return mailinfoObj
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
        const mailinfoObj = new Mailinfo({
          ...res.data,
        })
        return mailinfoObj
      })
  }
}

export default MailinfofoResource