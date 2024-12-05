import { Types } from "mongoose";
import { TUserRole } from "../users/users.constant";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export interface TProfile{
    id: string;
    user: Types.ObjectId;
    email: string;
    password: string;
    passwordChangeDate?: Date;
    role: TUserRole;
    isDeleted: boolean;
    status: 'blocked'|'active';
    verifyPassword: (password: string) => Promise<boolean>;
    name: TUserName;
    age: number;
    dateOfBirth: string;
    contactNumber: string;
    gurdianContactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    nidCardNo: string;
    photo: string;    
}