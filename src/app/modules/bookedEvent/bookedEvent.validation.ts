import { z } from "zod";

export const bookedEventValidation = z.object({
    eventCode: z.string(),
    userID: z.string()
})