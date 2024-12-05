/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../users/users.model";
import { BookedEvent } from "./bookedEvent.model";
import { Event } from "../event/event.model";

const bookedEventIntoDB = async (userId: string, eventCode: string) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found !");
    }

    const bookedEventExist = await BookedEvent.findOne({
        userId: user._id,
        eventCode,
    });

    if (bookedEventExist !== null) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You already booked this event !!"
        );
    }

    const eventToBook = await Event.findOne({ _id:eventCode })
    if (!eventToBook) {
        throw new AppError(httpStatus.NOT_FOUND,"Event not found!!")
    }
    if (eventToBook?.capacity <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST,"Seat is full !!")
    }

    const result = await BookedEvent.create({ userId: user._id, eventCode });
    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Booked event failed !");
    }
    const updateEventCapacity = await Event.findOneAndUpdate(
        { _id:eventCode },
        { $inc: { capacity: -1 } },
        { new: true }
    );
    if (!updateEventCapacity) {
        throw new AppError(httpStatus.BAD_REQUEST, "Event capacity update failed !");
    }
    return result;
};
const cancelEventFromDB = async (userId: string, eventCode: string) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not Found !");
    }
    const result = await BookedEvent.deleteOne({ userId: user._id, eventCode });
    if (result.deletedCount === 0) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `No booked event found with userId: ${userId} and eventCode: ${eventCode}`
        );
    }
    const updateEventCapacity = await Event.findOneAndUpdate(
        { _id:eventCode },
        { $inc: { capacity: 1 } },
        { new: true }
    );
    if (!updateEventCapacity) {
        throw new AppError(httpStatus.BAD_REQUEST, "Event capacity update failed !");
    }
    return result;
};

const getMyEventsFromDB = async (userId: string) => {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found !!");
    }
    const result = await BookedEvent.find({ userId: user._id })
        .populate("userId")
        .populate("eventCode");

    return result;
};

const getUserByEventFromDB = async (eventCode: string) => {
    const result = await BookedEvent.find({ eventCode }).populate("userId");
    return result;
};

export const bookedEventServices = {
    bookedEventIntoDB,
    cancelEventFromDB,
    getMyEventsFromDB,
    getUserByEventFromDB,
};
