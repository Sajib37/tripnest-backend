import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controllers";

const router= Router()

router.post(
    "/login",
    validateRequest(authValidation.loginValidationSchema),
    authController.loginUser
);

export const authRoutes = router;