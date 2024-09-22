import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./users.service";
import { Tuser } from "./users.interface";

const createUser = catchAsync(async (req, res) => {
    const payload: Partial<Tuser> = req.body;
    const result = await userService.createUserIntoDB(payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sign up successfull!",
        data: result,
    });
});

const blockedUser=catchAsync(async (req, res) => {
    const id: string = req.params.id;
    const result = await userService.blockedUserIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is blocked !!",
        data: result,
    });
}); 

const deletUser=catchAsync(async (req, res) => {
    const id: string = req.params.id;
    const result = await userService.deletUserIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is deleted !!",
        data: result,
    });
}); 

export const userControllers = {
    createUser,
    blockedUser,
    deletUser
}