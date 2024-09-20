import config from "../config";
import { USER_ROLE } from "../modules/users/users.constant";

/* eslint-disable @typescript-eslint/no-unused-vars */
const superAdmin = {
    email: config.super_admin_email,
    password:config.super_admin_password,
    role:USER_ROLE.superAdmin,
    isDeleted:false,
    isBlocked:false,
}