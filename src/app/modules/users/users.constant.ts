export type TUserRole = "admin" | "user" |"superAdmin";
export const USER_ROLE = {
    user:"user",
    admin: "admin",
    superAdmin:"superAdmin"
} as const;