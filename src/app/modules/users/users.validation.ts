import { z } from "zod";
import { USER_ROLE } from "./users.constant";

const createUserValidation = z.object({
    email: z.string(),
    password: z.string(),
    role: z.enum([USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]),
    isDeleted: z.boolean(),
    status: z.enum(['blocked','active'])
})

export const usersValidation = {
    createUserValidation
}