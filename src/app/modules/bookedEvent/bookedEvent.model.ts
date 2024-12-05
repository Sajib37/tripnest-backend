import { model, Schema } from "mongoose";
import { TbookedEvent } from "./bookedEvent.interface";

const bookedEventSchema = new Schema<TbookedEvent>({
    eventCode: {
        type: Schema.Types.ObjectId,
        required: [true, "Event code is required!"],
        ref: "event", 
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User is required!"],
        ref: "user",
    },
});


export const BookedEvent = model<TbookedEvent>(
    "bookedEvent",
    bookedEventSchema
);
