/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadApiResponse } from "cloudinary";
import { TEvent } from "./event.interface"
import { Event } from "./event.model"
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { generateEventCode } from "./event.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";


const createEventIntoDB = async (payload: Partial<TEvent>, file: any) => {
    const { startDate, endDate, title } = payload
    const isExist = await Event.findOne({ title, status: { $in: ['on-going', 'upcoming'] } });
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Same event can't exist in on-going or upcoming!")
    }
    // send image to cloudinary
    const imageName = `imageOf${payload.eventCode}`;
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
        throw new AppError(httpStatus.BAD_REQUEST,"startdate missing !!")
    }
    if (!endDate) {
        throw new AppError(httpStatus.BAD_REQUEST,"endDate missing !!")
    }
    const currentDate = new Date().toISOString();
    if (startDate.toISOString() > currentDate) {
        payload.status= 'upcoming'
    } else if (currentDate > endDate.toISOString()) {
        payload.status='completed'
    } else {
        payload.status='on-going'
    }
    const result = Event.create(payload);
    return result
}

export const eventServices = {
    createEventIntoDB
}