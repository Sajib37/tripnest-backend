import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../users/users.model";
import { BookedEvent } from "./bookedEvent.model";

const bookedEventIntoDB = async (userId: string, eventCode: string) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found !");
    }

    const bookedEventExist = await BookedEvent.findOne({ userId: user._id, eventCode });

    if (bookedEventExist!==null) {
        throw new AppError(httpStatus.BAD_REQUEST,"You already booked this event !!")
    }
    const result = await BookedEvent.create({ userId: user._id, eventCode })
    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Booked event failed !");
    }
    return result;
};
const cancelEventFromDB = async (userId: string, eventCode: string) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found !");
    }
    const result = await BookedEvent.deleteOne({ userId:user._id, eventCode })
    if (result.deletedCount === 0) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `No booked event found with userId: ${userId} and eventCode: ${eventCode}`
        );
    }
    return result;
};


export const bookedEventServices = {
    bookedEventIntoDB,
    cancelEventFromDB
}
