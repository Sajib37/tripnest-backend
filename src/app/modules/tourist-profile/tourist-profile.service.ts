/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Profile } from "./tourist-profile.model";
import { TProfile } from "./tourist-profile.interface";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { UploadApiResponse } from "cloudinary";
import { generateUID } from "./tourist-profile.utils";
import { Tuser } from "../users/users.interface";
import mongoose from "mongoose";
import { User } from "../users/users.model";
import QueryBuilder from "../../builder/QueryBuilder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProfileIntoDB = async (payload: Partial<TProfile>, file: any) => {
    const isExist = await Profile.findOne({
        email: payload.email,
    });
    if (isExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Your email is already in used!"
        );
    }

    const session = await mongoose.startSession();
    const userData: Partial<Tuser> = {};

    try {
        await session.startTransaction();
        // send image to cloudinary
        const imageName = `imageOf${payload.email}`;
        const profileImage: UploadApiResponse = await sendImageToCloudinary(
            imageName,
            file.path
        );

        payload.photo = profileImage?.secure_url;

        // generate user ID
        payload.id = await generateUID();

        userData.password = payload.password;
        userData.role = payload.role;
        userData.email = payload.email;
        userData.id = payload.id;
        userData.passwordChangeDate = payload.passwordChangeDate;

        const newUser =await User.create([userData],{session});
        
        if (!(await newUser).length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to create new user!!"
            );
        }

        payload.user = newUser[0]._id;

        const newProfile = await Profile.create([payload], { session })
        await session.commitTransaction();
        await session.endSession();
        return newProfile[0]
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        console.log(err)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to create new admin and User!! "
        );
    }
};

const upadteTouristProfile = async (
    payload: Partial<TProfile>,
    file: any,
    id: string
) => {
    const isExist = await Profile.findById(id);
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
};

const getAllProfilesFromDB = async (query: Record<string, unknown>) => {
    const eventSearchableFields: string[] = ["eventCode", "title"];
    const eventQuery = new QueryBuilder<TProfile>(Profile.find(), query)
        .search(eventSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await eventQuery.modelQuery;
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "All profile not Found !");
    }
    const meta = await eventQuery.countTotal();
    return {
        result,
        meta,
    };
}

export const profileServices = {
    createProfileIntoDB,
    upadteTouristProfile,
    getAllProfilesFromDB
};
