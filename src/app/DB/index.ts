import { USER_ROLE } from "../modules/users/users.constant";
import { Tuser } from "../modules/users/users.interface";
import { User } from "../modules/users/users.model";
import config from "../config";

const superAdmin : Partial<Tuser> = {
    email: config.super_admin_email,
    id: 'SA-0001',
    password:config.super_admin_password,
    role:USER_ROLE.superAdmin,
    isDeleted:false,
    status: 'active'
}

const seedSuperAdmin = async () => {    
    const isSuperAdminExist = await User.findOne({ role: USER_ROLE.superAdmin });
    if (!isSuperAdminExist && superAdmin.email && superAdmin.password) {
        await User.create(superAdmin)
    }
}

export default seedSuperAdmin
