import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../users/users.model";
import { TLoginUser, TPasswordChange } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

const loginUserToSite = async (payload: TLoginUser) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email }).select("+password");

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid User !!");
    }
    const isDeleted = isUserExist.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
    }
    const userStatus = isUserExist.status;
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "User is Blocked !!");
    }

    // here verifyPassword work when i install mongoose bcrytp and also add user interface=> verifyPassword: (password: string) => Promise<boolean>;
    const matchPassword = await isUserExist.verifyPassword(password);

    if (!matchPassword) {
        throw new AppError(httpStatus.FORBIDDEN, "Wrong password !!");
    }

    // craete token and send to the user

    const jwtPayload = {
        email: isUserExist?.email,
        role: isUserExist?.role,
        id: isUserExist?.id
    };
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.access_secret_expires_in as string
    );
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.refresh_secret_expires_in as string
    );
    return {
        accessToken,
        refreshToken
    };
};

const changePasswordIntoDB = async (userData:JwtPayload, payload: TPasswordChange) => {
    const { newPassword, oldPassword:password } = payload;
   
    const { id, role } = userData;
    const isUserExist = await User
        .findOne({ id })
        .select("+password");

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid User !!");
    }
    const isDeleted = isUserExist.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
    }
    const userStatus = isUserExist.status;
    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "User is Blocked !!");
    }

    const matchPassword = await isUserExist.verifyPassword(password);

    if (!matchPassword) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "old password do not matched !!"
        );
    }

    const result = await User.findOneAndUpdate(
        { id, role: role },
        {
            password: newPassword,
            passwordChangeDate: new Date(),
        },
        { new: true }
    );

    return result;
};



export const authServices = {
    loginUserToSite,
    changePasswordIntoDB
}