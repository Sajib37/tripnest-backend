/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Profile } from "./tourist-profile.model";
import { TProfile } from "./tourist-profile.interface";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { UploadApiResponse } from "cloudinary";
import { generateUID } from "./tourist-profile.utils";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProfileIntoDB = async (payload: Partial<TProfile>, file: any) => {
    const isExist = await Profile.findOne({
        email: payload.email
    });
    if (isExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Your email is already in used!"
        );
    }
    // send image to cloudinary
    const imageName = `imageOf${payload.email}`;
    const profileImage: UploadApiResponse = await sendImageToCloudinary(
        imageName,
        file.path
    );

    payload.photo = profileImage?.secure_url;
    
    // generate user ID
    payload.id = await generateUID();
    
    const result = Profile.create(payload);
    return result;
}


const upadteTouristProfile = async (payload: Partial<TProfile>,file: any,id: string) => {
    const isExist = await Profile.findById(id)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not Found!");
    }

    if (file) {
        // send image to cloudinary
        const imageName = `imageOf${payload.email}`;
        // console.log("path: ", file.path)
        const profileImage: UploadApiResponse = await sendImageToCloudinary(
            imageName,
            file.path
        );
        // set the secure url in payload profileimg
        payload.photo = profileImage?.secure_url;
    }

    const result = await Profile.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

export const profileServices = {
    createProfileIntoDB,
    upadteTouristProfile
}
