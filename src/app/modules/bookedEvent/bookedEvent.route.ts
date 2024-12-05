import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.constant";
import { bookedEventControllers } from "./bookedEvent.controllers";

const router = Router();

router.post(
    "/booked-event/:eventCode",
    auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
    bookedEventControllers.bookedEvents
);
router.delete(
    "/cancel-event/:eventCode",
    auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
    bookedEventControllers.cancelEvent
);

router.get(
    "/my-events",
    auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
    bookedEventControllers.getMyEvents
);

// my event
// booked user
export const bookedEventRoutes = router;
