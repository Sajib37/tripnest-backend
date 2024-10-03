import { Router } from "express";
import { userRoutes } from "../modules/users/users.route";
import { authRoutes } from "../modules/auth/auth.route";
import { eventRoutes } from "../modules/event/event.route";
import { profileRoutes } from "../modules/tourist-profile/tourist-profile.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes,
    },
    {
        path: "/auth",
        route: authRoutes,
    },
    {
        path: "/event",
        route: eventRoutes,
    },
    {
        path: "profile",
        route: profileRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
