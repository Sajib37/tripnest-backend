

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd() , '.env') })
// if .env is in root folder, then above two line do not needed
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_secret_expires_in: process.env.ACCESS_SECRET_EXPIRES,
    refresh_secret_expires_in: process.env.REFRESH_SECRET_EXPIRES,
    reset_ui_link: process.env.RESET_UI_LINK
};