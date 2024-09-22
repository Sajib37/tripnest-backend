/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload: TLoginUser= req.body
    const result = await authServices.loginUserToSite(payload);
    const { accessToken, refreshToken } = result;
    // set the token in the cookie
    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV === 'development' ? false : true,
        // when need to deploy then uncomment the above two lines. samesite none means server and client is not same site
        // sameSite: 'none',
        // maxAge: 1000*60*60*24*365,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Login Successfully!!",
        data: {
            accessToken,
        }
    })
})


export const authController = {
    loginUser
}