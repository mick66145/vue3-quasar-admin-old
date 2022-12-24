import Base from './Base'

class Role extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.name = obj.name
    this.menus = obj.menus
  }
}
export default Role
