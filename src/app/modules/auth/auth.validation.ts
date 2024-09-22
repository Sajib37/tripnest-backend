import { z } from "zod";

const loginValidationSchema = z.object({
    email: z.string({ required_error: "email is required !!!" }),
    password: z.string({ required_error: "password is required !!!" }),
});
const forgetPasswordValidation = z.object({
    email: z.string({ required_error: "email is required !!" }),
});

const resetPasswordValidation = z.object({
    email: z.string({ required_error: "email is required !!" }),
    newPassword: z.string({ required_error: "New password is required !!" }),
});

export const authValidation = {
    loginValidationSchema,
    forgetPasswordValidation,
    resetPasswordValidation,
};