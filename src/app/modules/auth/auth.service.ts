import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../users/users.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";

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


export const authServices = {
    loginUserToSite
}