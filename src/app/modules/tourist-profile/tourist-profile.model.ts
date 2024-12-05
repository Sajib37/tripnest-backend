import { model, Schema } from "mongoose";
import { TProfile, TUserName } from "./tourist-profile.interface";
import { USER_ROLE } from "../users/users.constant";
import mongooseBcrypt from 'mongoose-bcrypt';

export const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                const str =
                    value.charAt(0).toUpperCase() +
                    value.slice(1).toLowerCase();
                return str === value;
            },
            message: "{VALUE} is not capitalized......!!!!",
        },
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                const str =
                    value.charAt(0).toUpperCase() +
                    value.slice(1).toLowerCase();
                return str === value;
            },
            message: "{VALUE} is not capitalized......!!!!",
        },
    },
});

const profileSchema = new Schema<TProfile>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, "user is required!"],
            unique: true,
            ref: "User",
        },
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
        },
        name: {
            type: userNameSchema,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        gurdianContactNumber: {
            type: String,
            required: true
        },
        presentAddress: {
            type: String,
            required: true
        },
        permanentAddress: {
            type: String,
            required: true
        },
        nidCardNo: {
            type: String,
            required: true
        },
        photo: {
            type: String,
        },
    },
    { timestamps: true }
);
// Add the mongoose-bcrypt plugin
profileSchema.plugin(mongooseBcrypt);

export const Profile = model<TProfile>("Profile", profileSchema);
