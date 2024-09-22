export type TUserRole = "user" | "admin"|"superAdmin";
export const USER_ROLE = {
    user:"user",
    admin: "admin",
    superAdmin:"superAdmin"
} as const;