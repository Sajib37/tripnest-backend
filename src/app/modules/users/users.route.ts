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
router.put(
    "/blocked-user/:id",
    userControllers.blockedUser
)
router.delete("/delet-user/:id", userControllers.deletUser)

export const userRoutes = router;
