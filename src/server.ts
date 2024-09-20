/* eslint-disable no-console */
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";
let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}
main();

// unhandledRejection handle
process.on('unhandledRejection', () => {
    console.log("unhandledRejection is detected !!😕\n server is shutting down now")
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1);
})

// uncaughtException
process.on("uncaughtException", () => {
    console.log("uncaughtException is detected !!😕\n server is shutting down now")
    process.exit(1)
})
