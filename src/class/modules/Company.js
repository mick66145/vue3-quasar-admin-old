import Base from './Base'

class Company extends Base {
  constructor (obj) {
    super();
    (obj) && (this.setInit(obj))
  }

  setInit (obj) {
    this.id = obj.id
    this.name = obj.name
    this.invoice = obj.invoice
    this.vatnumber = obj.vatnumber
    this.ceo = obj.ceo
    this.opendate = obj.opendate
    this.tel = obj.tel
    this.tel_ext = obj.tel_ext
    this.tel_service = obj.tel_service
    this.service_time = obj.service_time
    this.phone = obj.phone
    this.fax1 = obj.fax1
    this.email = obj.email
    this.city = obj.city
    this.area = obj.area
    this.post_code = obj.post_code
    this.address = obj.address
    this.address_en = obj.address_en
  }
}
export default Company
