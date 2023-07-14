export const exportBaseModules = () => {
  const modules = {}
  modules.Company = require('./modules/Company').default
  modules.CompanyJob = require('./modules/CompanyJob').default
  modules.User = require('./modules/User').default
  modules.Role = require('./modules/Role').default
  modules.City = require('./modules/City').default
  modules.Area = require('./modules/Area').default
  modules.SystemRecordLog = require('./modules/SystemRecordLog').default
  modules.MenuPermission = require('./modules/menu-permission/MenuPermission').default
  modules.PlatformAttribute = require('./modules/PlatformAttribute').default
  modules.MailLog = require('./modules/MailLog').default
  modules.Mailinfo = require('./modules/Mailinfo').default
  return modules
}
