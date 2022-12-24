import Base from './Base'

class User extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.name = obj.name
    this.account = obj.account
    this.password = obj.password
    this.email = obj.email
    this.is_enable = obj.is_enable
    this.remark = obj.remark
    this.role = obj.role
  }
}
export default User
