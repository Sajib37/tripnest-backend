import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Tuser } from "./users.interface";
import { User } from "./users.model";
import { generateId } from "./users.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createUserIntoDB = async (payload: Partial<Tuser>) => {
    const { email, role } = payload;
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "This email already exist !"
        );
    }
    if (!role) {
        throw new AppError(httpStatus.BAD_REQUEST, "user role required !");
    }
    payload.id = await generateId(role);
    const result = await User.create(payload);
    return result;
};

const blockedUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "user not found for this email !"
        );
    }
    const status = user.status === "blocked" ? "active" : "blocked";
    const result = await User.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );
    return result;
};

const deletUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "user not found for this email !"
        );
    }

    const result = await User.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};
const getAllUserFromDB = async (query: Record<string, unknown>) => {
    const userSearchFileds: string[] = ["role", "status"];
    const userQuery = new QueryBuilder<Tuser>(User.find(), query)
        .search(userSearchFileds)
        .filter()
        .sort()
        .paginate()
        .fields();
        const result = await userQuery.modelQuery
        if (!result) {
            throw new AppError(httpStatus.NOT_FOUND, "All enrolled course not Found");
        }
    const meta = await userQuery.countTotal()
    return {
        result,
        meta
    }
};
export const userService = {
    createUserIntoDB,
    blockedUserIntoDB,
    deletUserIntoDB,
    getAllUserFromDB,
};
