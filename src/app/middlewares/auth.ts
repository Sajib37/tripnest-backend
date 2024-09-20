/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { TUserRole } from "../modules/users/users.constant";
import { User } from "../modules/users/users.model";

const auth = (...userRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            // check that the user send token
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "Authorization required: Access denied!"
                );
            }

            // verify token and get the decoded
            const decoded: JwtPayload | string = await jwt.verify(
                token,
                config.jwt_access_secret as string
            );
            if (typeof decoded === "string") {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    "Token verification returned a string, which is unexpected."
                );
            }
            const { email, role, iat } = decoded;

            // check the is user exist or delet or blocked. at first the user from the usermodel
            const isUserExist = await User
                .findOne({ email: email })
                .select("+password");
            if (!isUserExist) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found!");
            }

            const {passwordChangeDate,isDeleted, status } = isUserExist;
            if (iat !== undefined && passwordChangeDate) {
                const iatISO = new Date(iat * 1000);
                if (passwordChangeDate > iatISO) {
                    console.log("after login password is changhed !!")
                    throw new AppError(httpStatus.BAD_REQUEST, "After change password, you need to login first !!")
                }
            }

            if (isDeleted) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "User is deleted !!"
                );
            }

            if (status === "blocked") {
                throw new AppError(httpStatus.FORBIDDEN, "User is Blocked !!");
            }

            // the below part are used for authorization..
            if (userRoles && !userRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "Authorization required: You cannot access this route."
                );
            }

            req.user = decoded;
            next();
        }
    );
};

export default auth;