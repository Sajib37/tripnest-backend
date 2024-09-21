import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./users.service";
import { Tuser } from "./users.interface";

const createUser = catchAsync(async (req, res) => {
    const payload: Tuser = req.body;
    const result = await userService.createUserIntoDB(payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sign up successfull!",
        data: result,
    });
});


export const userControllers = {
    createUser
}