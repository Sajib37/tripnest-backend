import config from "../config";
import { USER_ROLE } from "../modules/users/users.constant";
import { Tuser } from "../modules/users/users.interface";

/* eslint-disable @typescript-eslint/no-unused-vars */
const superAdmin : Partial<Tuser> = {
    email: config.super_admin_email,
    password:config.super_admin_password,
    role:USER_ROLE.superAdmin,
    isDeleted:false,
    status: 'active'
}
