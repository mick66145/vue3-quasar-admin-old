import Base from './Base'

class CompanyJob extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.name = obj.name
  }
}
export default CompanyJob
