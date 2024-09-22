import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.constant";

const router = Router();

router.post(
    "/login",
    validateRequest(authValidation.loginValidationSchema),
    authController.loginUser
);

router.put(
    "/change-password",
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
    authController.changePassword
);

router.post("/refresh-token", authController.refreshToken);

router.post(
    "/forget-password",
    validateRequest(authValidation.forgetPasswordValidation),
    authController.forgetPassword
);

router.patch(
    "/reset-password",
    validateRequest(authValidation.resetPasswordValidation),
    authController.resetPassword
);

export const authRoutes = router;
