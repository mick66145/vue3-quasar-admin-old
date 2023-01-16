import Base from './Base'

class User extends Base {

  //api欄位
  id = "";
  name = "";
  account = "";
  password = "";
  email = "";
  is_enable = true;
  remark = "";
  role = "";
  company_job = "";

  constructor(obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit(obj) {
    this.id = obj.id
    this.name = obj.name
    this.account = obj.account
    this.password = obj.password
    this.email = obj.email
    this.is_enable = obj.is_enable
    this.remark = obj.remark
    this.role = obj.role
    this.company_job = obj.company_job
  }
}
export default User
