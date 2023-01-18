import Base from './Base'
import { convertDateTime } from '@/utils/data-convert'
class SystemRecordLog extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.created_at = convertDateTime(obj.created_at)
    this.user = obj.user
    this.description = obj.description
    this.sourceip = obj.sourceip
  }
}
export default SystemRecordLog
