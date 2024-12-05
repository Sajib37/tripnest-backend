import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TProfile } from "./tourist-profile.interface";
import { profileServices } from "./tourist-profile.service";


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

export const profileControllers = {
    createProfile,
    upadetProfile
}