import { z } from "zod";
const ActivitiesValidation = z.object({
    day: z.string(), 
    activities: z.array(z.string()) 
  });
const createEventValidation = z.object({
    eventCode: z.string().optional(),
    title:z.string(),
    description:z.string(),
    from:z.string(),
    destinations: z.array(z.string()),
    startDate:z.string(),
    endDate:z.string(),
    bookingDeadline:z.string(),
    price: z.number().positive(),
    capacity: z.number().positive(),
    availableSlots: z.number().positive(),
    status:z.enum(["completed", "on-going", "upcoming"]).optional(),
    photo: z.string().optional(),
    category:z.enum(["Economic" , "Standard" , "Premium"]),
    includedServices:z.array(z.string()),
    excludedServices:z.array(z.string()),
    requiredEquipment:z.array(z.string()),
    itinerary: z.array(ActivitiesValidation)    
})

const updateEventValidation = z.object({
    title:z.string().optional(),
    description:z.string().optional(),
    from:z.string().optional(),
    destinations: z.array(z.string()).optional(),
    startDate:z.date().optional(),
    endDate:z.date().optional(),
    bookingDeadline:z.date().optional(),
    price: z.number().positive().optional(),
    capacity: z.number().positive().optional(),
    availableSlots: z.number().positive().optional(),
    status:z.enum(["completed", "on-going", "upcoming"]).optional(),
    photo: z.string().optional(),
    category:z.enum(["Economic" , "Standard" , "Premium"]).optional(),
    includedServices:z.array(z.string()).optional(),
    excludedServices:z.array(z.string()).optional(),
    requiredEquipment:z.array(z.string()).optional(),
    itinerary: z.array(ActivitiesValidation).optional(),    
})

export const eventValidations = {
    createEventValidation,
    updateEventValidation
}