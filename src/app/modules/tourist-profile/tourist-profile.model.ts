import { model, Schema } from "mongoose";
import { TProfile, TUserName } from "./tourist-profile.interface";

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
            required: true,
        },
        name: {
            type: userNameSchema,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            unique:true,
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

export const Profile = model<TProfile>("Profile", profileSchema);
