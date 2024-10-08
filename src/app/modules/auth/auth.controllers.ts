/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TLoginUser, TPasswordChange } from "./auth.interface";
import config from "../../config";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/appError";

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
    
    const result= await authServices.changePasswordIntoDB(userData,payload)
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Password changed Successfully!!",
        data: {
            result
        }
    })
})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "refresh not found in browser cookie !!")
    }
    const result= await authServices.refreshTokenService(refreshToken)
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Access token recreated Successfully!!",
        data: result
    })
})

const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const email: string = req.body.email;

    const result= await authServices.forgetPassword(email)

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Reset link generated Successfully!!",
        data: result
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const token: string = req.headers.authorization as string;
    // const id: string = req.body.id as string;
    // here I can retrive the email and token form ui-link in frontend and send the backend as object
    const email: string = req.body.email as string;
    const newPassword: string = req.body.newPassword as string;
    const token: string =req.body.token
    const result= await authServices.resetPasswordIntoDb(email,newPassword,token)

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Password reset Successfully!!",
        data: result
    })
})

export const authController = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}