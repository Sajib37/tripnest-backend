/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadApiResponse } from "cloudinary";
import { TEvent } from "./event.interface";
import { Event } from "./event.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { generateEventCode } from "./event.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createEventIntoDB = async (payload: Partial<TEvent>, file: any) => {
    const { startDate, endDate, title } = payload;

    const isExist = await Event.findOne({
        title,
        status: { $in: ["on-going", "upcoming"] },
    });
    if (isExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Same event can't exist in on-going or upcoming!"
        );
    }
    // send image to cloudinary
    const imageName = `imageOf${payload.title}`;
    // console.log("path: ", file.path)
    const profileImage: UploadApiResponse = await sendImageToCloudinary(
        imageName,
        file.path
    );
    // set the secure url in payload profileimg
    payload.photo = profileImage?.secure_url;
    // generate the event code
    payload.eventCode = await generateEventCode();

    if (!startDate) {
        throw new AppError(httpStatus.BAD_REQUEST, "startdate missing !!");
    }
    if (!endDate) {
        throw new AppError(httpStatus.BAD_REQUEST, "endDate missing !!");
    }
    if (startDate >= endDate) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "starting date must be less than end date !"
        );
    }
    const currentDate = new Date();
    if (startDate > currentDate) {
        payload.status = "upcoming";
    } else if (currentDate > endDate) {
        payload.status = "completed";
    } else {
        payload.status = "on-going";
    }
    const result = Event.create(payload);
    return result;
};
const updateEventIntoDB = async (
    payload: Partial<TEvent>,
    file: any,
    id: string
) => {
    const isExist = await Event.findById(id);
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Event not Found!");
    }
    const { startDate, endDate } = payload;
    if (file) {
        // send image to cloudinary
        const imageName = `imageOf${payload.title}`;
        // console.log("path: ", file.path)
        const profileImage: UploadApiResponse = await sendImageToCloudinary(
            imageName,
            file.path
        );
        // set the secure url in payload profileimg
        payload.photo = profileImage?.secure_url;
    }
    const currentDate = new Date();
    if (startDate && endDate) {
        if (startDate > currentDate) {
            payload.status = "upcoming";
        } else if (currentDate > endDate) {
            payload.status = "completed";
        } else {
            payload.status = "on-going";
        }
    } else if (startDate && !endDate) {
        if (startDate > currentDate) {
            payload.status = "upcoming";
        } else if (currentDate > isExist.endDate) {
            payload.status = "completed";
        } else {
            payload.status = "on-going";
        }
    } else if (endDate && !startDate) {
        if (isExist.startDate > currentDate) {
            payload.status = "upcoming";
        } else if (currentDate > endDate) {
            payload.status = "completed";
        } else {
            payload.status = "on-going";
        }
    } else {
        payload.status = isExist.status;
    }
    return payload;
};
export const eventServices = {
    createEventIntoDB,
    updateEventIntoDB,
};
