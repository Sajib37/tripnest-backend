/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TLoginUser, TPasswordChange } from "./auth.interface";
import config from "../../config";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

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

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload: TPasswordChange= req.body
    
    // here, req.user set on the auth.ts utils. So, If wanna get the req.user we must use auth middleware
    const userData: JwtPayload = req.user;
    console.log(userData)
    
    const result= await authServices.changePasswordIntoDB(userData,payload)
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Login Successfully!!",
        data: {
            
        }
    })
})


export const authController = {
    loginUser,
    changePassword
}