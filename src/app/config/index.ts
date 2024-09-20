

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd() , '.env') })
// if .env is in root folder, then above two line do not needed
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD
};