import { searchKeysValue } from '../../src/utils/filter'

const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users = {
  'admin-token': {
    id: 1,
    name: '網站管理員',
    account: 'admin',
    email: 'admin@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
  'editor-token': {
    id: 2,
    name: '網站使用者',
    account: 'editor',
    email: 'editor@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '網站使用者',
    },
  },
}

const userList = [
  {
    id: 1,
    name: '網站管理員',
    account: 'admin',
    email: 'admin@admin.com',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
  {
    id: 2,
    name: '測試',
    account: 'user1',
    email: 'aaa@aaa.aa',
    phone: null,
    is_enable: true,
    remark: null,
    role: {
      id: 1,
      name: '管理員',
    },
  },
]

let id = 3

export default [
  {
    url: '/api/user',
    method: 'get',
    response: config => {
      // eslint-disable-next-line camelcase
      const { keyword, page = 1, page_size = 20 } = config.query
      const keywordFilter = {
        name: keyword,
        tel: keyword,
        tel_service: keyword,
        address: keyword,
        email: keyword,
      }
      const mockList = keyword ? searchKeysValue([...userList], keywordFilter) : [...userList]
      // eslint-disable-next-line camelcase
      const pageList = mockList.filter((item, index) => index < page_size * page && index >= page_size * (page - 1))
      return {
        code: 20000,
        data: {
          list: pageList,
          meta: {
            pagination: {
              total: mockList.length,
              // eslint-disable-next-line camelcase
              count: page_size,
            },
          },
        },
      }
    },
  },
  {
    url: '/api/user/:id(\\d+)',
    method: 'get',
    response: config => {
      const { id } = config.query
      for (const companyJob of userList) {
        if (+companyJob.id === +id) {
          return {
            code: 20000,
            data: companyJob,
          }
        }
      }
    },
  },
  {
    url: '/api/user',
    method: 'post',
    response: options => {
      const body = options.body
      body.id = id
      id += 1
      userList.push(body)
      return {
        code: 20000,
        data: body,
      }
    },
  },
  {
    url: '/api/user/:id(\\d+)',
    method: 'patch',
    response: config => {
      const { id } = config.query
      const index = userList.findIndex(x => x.id === id)
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
  {
    url: '/api/user/:id(\\d+)',
    method: 'delete',
    response: config => {
      const { id } = config.query
      const index = userList.findIndex(x => x.id === id)
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: config => {
      const { account } = config.body
      const token = tokens[account]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        }
      }

      return {
        code: 20000,
        data: token,
      }
    },
  },
  {
    url: '/api/whoami',
    method: 'get',
    response: (req, res) => {
      const { authorization } = req.headers
      const token = authorization.split('Bearer ')[1]
      const info = users[token]
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        }
      }
      return {
        code: 20000,
        data: info,
      }
    },
  },
]
