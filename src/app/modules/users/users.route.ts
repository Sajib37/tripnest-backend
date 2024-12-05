import { Router } from "express";
import { userControllers } from "./users.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./users.constant";

const router = Router();

router.patch(
    "/blocked-user/:id",
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    userControllers.blockedUser
);
router.delete(
    "/delet-user/:id",
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    userControllers.deletUser
);
router.patch(
    "/change-role/:id",
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    userControllers.changeRole
);

router.get(
    "/",
    // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    userControllers.getAllUser
);

export const userRoutes = router;
