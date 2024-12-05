import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import { profileValidation } from "./tourist-profile.validation";
import { profileControllers } from "./tourist-profile.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.constant";


const router = Router();

// parse the file format data
const parseDataIntoJSON = (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
};


router.get('/',
    profileControllers.getAllProfile
);

router.post('/create-profile',
    upload.single("file"),
    parseDataIntoJSON,
    validateRequest(profileValidation.createProfileValidation),
    profileControllers.createProfile
);

router.patch('/update-profile/:id',
    upload.single("file"),
    parseDataIntoJSON,
    validateRequest(profileValidation.updateProfileValidation),
    profileControllers.upadetProfile
);

router.get(
    "/me",
    auth(USER_ROLE.admin,USER_ROLE.user),
    profileControllers.getMe
);

export const profileRoutes= router