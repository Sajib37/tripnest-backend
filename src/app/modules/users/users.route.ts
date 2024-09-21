import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { usersValidation } from "./users.validation";
import { userControllers } from "./users.controllers";

const router = Router();

router.post(
    "/sign-up",
    validateRequest(usersValidation.createUserValidation),
    userControllers.createUser
);

export const userRoutes = router;
