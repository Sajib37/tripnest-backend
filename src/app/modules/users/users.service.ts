/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Tuser } from "./users.interface";
import { User } from "./users.model";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose, { mongo } from "mongoose";
import { Profile } from "../tourist-profile/tourist-profile.model";
import { TUserRole } from "./users.constant";

const blockedUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "user not found for this email !"
        );
    }
    
    const status = user.status === "blocked" ? "active" : "blocked";

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const userStatus = await User.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, session }
        );
        if (!userStatus) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to change user status!!"
            );
        }

        const profileStatus = await Profile.findOneAndUpdate(
            { id: user.id },
            { status: status },
            { new: true, session }
        );
        if (!profileStatus) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to delet profile!!"
            );
        }
        await session.commitTransaction();
        await session.endSession();

        return profileStatus;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to delet user and profile!! "
        );
    }
    
    return '';
};

const changeUserRoleIntoDB = async (id: string,role:TUserRole) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "user not found for this email !"
        );
    }

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const userRole = await User.findByIdAndUpdate(
            id,
            { role:role },
            { new: true, session }
        );
        if (!userRole) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to change user role!!"
            );
        }

        const profileRole = await Profile.findOneAndUpdate(
            { id: user.id },
            { role:role },
            { new: true, session }
        );
        if (!profileRole) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to change profile role!!"
            );
        }
        await session.commitTransaction();
        await session.endSession();

        return profileRole;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to delet user and profile!! "
        );
    }
    
    return '';
};

const deletUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "user not found for this email !"
        );
    }

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const userdelet = await User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session }
        );
        if (!userdelet) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to delet user!!"
            );
        }

        const profileDelete = await Profile.findOneAndUpdate(
            { id: user.id },
            { isDeleted: true },
            { new: true, session }
        );
        if (!profileDelete) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to delet profile!!"
            );
        }
        await session.commitTransaction();
        await session.endSession();

        return profileDelete;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to delet user and profile!! "
        );
    }
    return "";
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
    const userSearchFileds: string[] = ["role", "status"];
    const userQuery = new QueryBuilder<Tuser>(User.find(), query)
        .search(userSearchFileds)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await userQuery.modelQuery;
    if (!result) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "All enrolled course not Found"
        );
    }
    const meta = await userQuery.countTotal();
    return {
        result,
        meta,
    };
};
export const userService = {
    blockedUserIntoDB,
    deletUserIntoDB,
    getAllUserFromDB,
    changeUserRoleIntoDB
};
