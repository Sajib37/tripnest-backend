import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TEvent } from "./event.interface";
import { eventServices } from "./event.service";

const createEvent = catchAsync(async (req, res) => {
    const payload: Partial<TEvent> = req.body;
    const result = await eventServices.createEventIntoDB(payload, req.file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event created successfully!",
        data: result,
    });
});

const upadetEvent = catchAsync(async (req, res) => {
    const payload: Partial<TEvent> = req.body;
    const id: string = req.params.id;
    const result = await eventServices.updateEventIntoDB(payload, req.file, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event updated successfully!",
        data: result,
    });
});

const getAllEvent = catchAsync(async (req, res) => {
    const query: Record<string, unknown> = req.query;
    const result = await eventServices.getAllEventFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all Event successfully!",
        meta:result.meta,
        data: result.result,
    });
});

const getSingleEvent = catchAsync(async (req, res) => {
    const id:string= req.params.id
    const result = await eventServices.getSingleEventFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single Event successfully!",
        data: result
    });
});

export const eventControllers = {
    createEvent,
    upadetEvent,
    getAllEvent,
    getSingleEvent
};
