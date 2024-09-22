import { TUserRole } from "./users.constant";

export interface Tuser{
    email: string;
    password: string;
    passwordChangeDate?: Date;
    role: TUserRole;
    isDeleted: boolean;
    status: 'blocked'|'active';
    verifyPassword: (password: string) => Promise<boolean>;
}