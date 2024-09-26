import { TActivities, TEventCategory, TEventStatus } from "./event.constatnt";

export interface TEvent{
    eventCode: string;
    title: string;
    description: string;
    from: string;
    destinations: string[];
    startDate: Date;
    endDate: Date;
    bookingDeadline: Date;
    price: number;
    capacity: number;
    availableSlots: number;
    status: TEventStatus;
    photo: string;
    category: TEventCategory;
    includedServices: string[];
    excludedServices: string[];
    requiredEquipment: string[];
    itinerary:TActivities[]
}