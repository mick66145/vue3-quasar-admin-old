import Base from './Base'
import { convertDateTime } from '@/utils/data-convert'
class Role extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.created_at = convertDateTime(obj.created_at)
    this.name = obj.name
    this.menus = obj.menus
  }
}
export default Role
