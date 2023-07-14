export const exportBaseApiModules = () => {
  const modules = {}
  modules.AreaResource = require('./restful/area').default
  modules.AuthResource = require('./restful/auth').default
  modules.CityResource = require('./restful/city').default
  modules.CompanyJobResource = require('./restful/company-job').default
  modules.CompanyResource = require('./restful/company').default
  modules.FileResource = require('./restful/file').default
  modules.RoleResource = require('./restful/role').default
  modules.SystemResource = require('./restful/system').default
  modules.UserResource = require('./restful/user').default
  modules.MenuPermissionResource = require('./restful/menu-permission').default
  modules.PlatformAttributeResource = require('./restful/platform-attribute').default
  modules.MailLogResource = require('./restful/mail-log').default
  modules.MeResource = require('./restful/me').default
  modules.MailinfoResource = require('./restful/mailinfo').default
  return modules
}
