import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Tuser } from "./users.interface";
import { User } from "./users.model";

const createUserIntoDB = async (payload: Tuser) => {
    const { email } = payload;
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "This email already exist !")
    }
    const result = await User.create(payload);
    return result
}

export const userService = {
    createUserIntoDB
}