import { z } from "zod";

const userNameValidation = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
});

const createProfileValidation = z.object({
    name:userNameValidation,
    age:z.number(),
    email:z.string(),
    dateOfBirth:z.string(),
    contactNumber:z.string(),
    gurdianContactNumber:z.string(),
    presentAddress:z.string(),
    permanentAddress:z.string(),
    nidCardNo:z.string(),
})

const updateProfileValidation = z.object({
    name:userNameValidation.optional(),
    age:z.number().optional(),
    email:z.string().optional(),
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