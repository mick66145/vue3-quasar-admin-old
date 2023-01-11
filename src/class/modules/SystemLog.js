import Base from './Base'
import { convertDateTime } from '@/utils/data-convert'
class SystemLog extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.created_at = convertDateTime(obj.created_at)
    this.name = obj.name
    this.user = obj.user
    this.describe = obj.describe
    this.ip = obj.ip
  }
}
export default SystemLog
