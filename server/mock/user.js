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

export default [
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
