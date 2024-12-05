import { z } from "zod";
import { USER_ROLE } from "../users/users.constant";

const userNameValidation = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const createProfileValidation = z.object({
    name: userNameValidation,
    email: z.string(),
    password: z.string(),
    age:z.number(),
    dateOfBirth:z.string(),
    contactNumber:z.string(),
    gurdianContactNumber:z.string(),
    presentAddress:z.string(),
    permanentAddress:z.string(),
    nidCardNo:z.string(),
})

const updateProfileValidation = z.object({
    name:userNameValidation.optional(),
    age: z.number().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]).optional(),
    isDeleted: z.boolean().optional(),
    status: z.enum(['blocked','active']).optional(),
    dateOfBirth:z.string().optional(),
    contactNumber:z.string().optional(),
    gurdianContactNumber:z.string().optional(),
    presentAddress:z.string().optional(),
    permanentAddress:z.string().optional(),
    nidCardNo:z.string().optional(),
})


export const profileValidation = {
    createProfileValidation,
    updateProfileValidation
}