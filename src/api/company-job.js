import Resource from './resource'
import request from '@/utils/request'
import { CompanyJob } from '@/class'

class CompanyJobResource extends Resource {
  constructor () {
    super('company_job')
  }

  async list (query) {
    return await request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const companyJobObj = new CompanyJob(element)
          return companyJobObj
        })
        const { list, meta } = res.data
        const { count, total } = meta.pagination
        return {
          list: list,
          total: total,
          count: count,
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
        const companyJobObj = new CompanyJob({
          ...res.data,
        })
        return companyJobObj
      })
  }
}

export default CompanyJobResource
