import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TEvent } from "./event.interface";
import { eventServices } from "./event.service";

const createEvent = catchAsync(async (req, res) => {
    const payload: Partial<TEvent> = req.body;
    const result = await eventServices.createEventIntoDB(payload,req.file)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event created successfully!",
        data: result,
    });
});

export const eventControllers = {
    createEvent
}