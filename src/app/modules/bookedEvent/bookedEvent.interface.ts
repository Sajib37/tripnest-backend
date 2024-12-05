import { Types } from "mongoose";

export interface TbookedEvent{
    eventCode: Types.ObjectId;
    userId: Types.ObjectId;
}