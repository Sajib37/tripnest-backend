/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from "mongoose";
import { TEvent } from "./event.interface";
import { Event_Category, Event_status, TActivities } from "./event.constatnt";


const activitiesSchema = new Schema<TActivities>({
    day: {
        type: String,
        required: true
    },
    activities: {
        type: [String],
        required: true
    }
})

const eventSchema = new Schema<TEvent>({
    eventCode: {
        type: String,
        required: true,
        unique:true
    },
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    from:{
        type: String,
        required:true
    },
    destinations:{
        type: [String],
        required:true
    },
    startDate:{
        type: Date,
        required:true
    },
    endDate:{
        type: Date,
        required:true
    },
    bookingDeadline:{
        type: Date,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    capacity:{
        type: Number,
        default:40
    },
    availableSlots:{
        type: Number,
        default:40
    },
    status: {
        type: String,
        enum: Event_status
    },
    photo:{
        type: String,
    },
    category:{
        type: String,
        enum: Event_Category,
    },
    includedServices: {
        type: [String],
        required: true
    },
    excludedServices: {
        type: [String],
        required: true
    },
    requiredEquipment:{
        type: [String],
        required: true
    },
    itinerary: {
        type: [activitiesSchema],
        required: true
    }
}, { timestamps: true })

export const Event= model<TEvent>('Event',eventSchema)