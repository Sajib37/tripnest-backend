import { TUserRole } from "./users.constant";

export interface Tuser{
    email: string;
    password: string;
    passwordChangeDate?: Date;
    role: TUserRole;
    isDeleted: boolean;
    isBlocked: boolean;
    // verifyPassword: (password: string) => Promise<boolean>;
}
