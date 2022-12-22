import request from '@/utils/request'

/**
 * Simple RESTful resource class
 */
class Resource {
  constructor (uri) {
    this.uri = uri
  }

  list (query) {
    return request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
  }

  get (id, query) {
    return request({
      url: `/${this.uri}/${id}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
  }

  post (params) {
    return request({
      url: `/${this.uri}`,
      method: 'post',
      data: params,
    }).then(res => res.data)
  }

  patch (id, params) {
    return request({
      url: `/${this.uri}/${id}`,
      method: 'patch',
      data: params,
    }).then(res => res.data)
  }

  delete (id) {
    return request({
      url: `/${this.uri}/${id}`,
      method: 'delete',
    }).then(res => res.data)
  }
}

export { Resource as default }
