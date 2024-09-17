

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd() , '.env') })
// if .env is in root folder, then above two line do not needed
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};