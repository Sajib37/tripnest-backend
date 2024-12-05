/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TProfile } from "./tourist-profile.interface";
import { profileServices } from "./tourist-profile.service";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";


const createProfile = catchAsync(async (req, res) => {
    const payload: Partial<TProfile> = req.body;
    const result = await profileServices.createProfileIntoDB(payload, req.file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile created successfully!",
        data: result,
    });
});


const upadetProfile = catchAsync(async (req, res) => {
    const payload: Partial<TProfile> = req.body;
    const id: string = req.params.id;
    const result = await profileServices.upadteTouristProfile(payload, req.file, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully!",
        data: result,
    });
});
const getAllProfile = catchAsync(async (req, res) => {
    const query: Record<string, unknown> = req.query;
    const result = await profileServices.getAllProfilesFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get all profile successfully!",
        meta:result.meta,
        data: result.result,
    });
});

const getMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user :JwtPayload=req.user
        // const token: string = req.headers.authorization as string;
        const result = await profileServices.getMeFromDD(user)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "your data get successfully!",
            data: result,
        });
    }
);

export const profileControllers = {
    createProfile,
    upadetProfile,
    getAllProfile,
    getMe
}