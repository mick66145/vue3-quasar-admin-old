import Base from '../Base';
import Permission from './Permission';
class MenuPermission extends Base {

    //api
    id = ""
    name = ""
    childs = []
    permissions = []

    constructor(obj) {
        super();
        if (obj) {
            this.id = obj?.id;
            this.name = obj?.name;
            this.childs = [...obj?.childs].map(element => {
                const menuPermissionObj = new MenuPermission(element)
                return menuPermissionObj
            });
            this.permissions = [...obj?.permissions].map(element => {
                const permissionObj = new Permission(element)
                return permissionObj
            })
        }
    }
}
export default MenuPermission;
