export const exportBaseApiModules = () => {
  const modules = {}
  modules.AreaResource = require('./modules/area').default
  modules.AuthResource = require('./modules/auth').default
  modules.CityResource = require('./modules/city').default
  modules.CompanyJobResource = require('./modules/company-job').default
  modules.CompanyResource = require('./modules/company').default
  modules.FileResource = require('./modules/file').default
  modules.RoleResource = require('./modules/role').default
  modules.SystemResource = require('./modules/system').default
  modules.UserResource = require('./modules/user').default
  modules.MenuPermissionResource = require('./modules/menu-permission').default
  modules.PlatformAttributeResource = require('./modules/platform-attribute').default
  modules.MailLogResource = require('./modules/mail-log').default
  modules.MeResource = require('./modules/me').default
  modules.MailinfoResource = require('./modules/mailinfo').default
  return modules
}
