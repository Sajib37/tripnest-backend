import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export interface TProfile{
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    age: number;
    email: string;
    dateOfBirth: string;
    contactNumber: string;
    gurdianContactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    nidCardNo: string;
    photo: string;    
}