/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config";
import multer from "multer";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import fs from "fs";

export const sendImageToCloudinary = async (
    name: string,
    path: string
): Promise<UploadApiResponse> => {
    // Configuration
    cloudinary.config({
        cloud_name: config.cloud_name,
        api_key: config.cloudinary_api_key,
        api_secret: config.cloudinary_api_secret,
    });

    try {
        // Upload an image
        const uploadResult: UploadApiResponse =
            await cloudinary.uploader.upload(path, {
                public_id: name,
            });

        // now delet the file from the uploads folder
        fs.unlink(path, (err: unknown) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return;
            }
        });

        return uploadResult; // Return the result if successful
    } catch (error) {
        throw new AppError(httpStatus.FORBIDDEN, "image upload failed !!"); // Throw the error to be handled by the caller
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/"); //set the folder directory where the file save
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });