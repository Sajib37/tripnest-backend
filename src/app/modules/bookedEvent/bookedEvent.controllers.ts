import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookedEventServices } from "./bookedEvent.service";
import { JwtPayload } from "jsonwebtoken";

const bookedEvents = catchAsync(async (req, res) => {
    const user:JwtPayload = req.user;
    const userID: string = user.id;
    const eventCode: string = req.params.eventCode;
    const result = await bookedEventServices.bookedEventIntoDB(userID,eventCode)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event booked successfully!",
        data: result,
    });
});

const cancelEvent = catchAsync(async (req, res) => {
    const user:JwtPayload = req.user;
    const userID: string = user.id;
    const eventCode: string = req.params.eventCode;
    const result = await bookedEventServices.cancelEventFromDB(userID,eventCode)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event cancelled successfully!",
        data: result,
    });
});


export const bookedEventControllers = {
    bookedEvents,
    cancelEvent
}
