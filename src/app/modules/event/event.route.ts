import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { eventControllers } from "./event.controllers";
import { USER_ROLE } from "../users/users.constant";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import { eventValidations } from "./event.validation";

const router = Router();

// parse the file format data
const parseDataIntoJSON = (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
};

router.post(
    "/create-event",
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    upload.single("file"),
    parseDataIntoJSON,
    validateRequest(eventValidations.createEventValidation),
    eventControllers.createEvent
);
router.patch(
    "/update-event/:id",
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    upload.single("file"),
    parseDataIntoJSON,
    validateRequest(eventValidations.createEventValidation),
    eventControllers.upadetEvent
);

export const eventRoutes = router;
