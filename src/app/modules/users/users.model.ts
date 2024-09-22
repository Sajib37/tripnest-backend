import { model, Schema } from "mongoose";
import { Tuser } from "./users.interface";
import { USER_ROLE } from "./users.constant";
import mongooseBcrypt from 'mongoose-bcrypt';

const UserSchema = new Schema<Tuser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        bcrypt:true,
        select:0
    },
    passwordChangeDate: {
        type: Date
    },
    role: {
        type: String,
        enum: [USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user],
        default: USER_ROLE.user
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'active',
        enum:['blocked','active']
    }
})

// Add the mongoose-bcrypt plugin
UserSchema.plugin(mongooseBcrypt);

export const User= model<Tuser>('User',UserSchema)