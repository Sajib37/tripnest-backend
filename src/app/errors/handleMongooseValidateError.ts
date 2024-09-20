import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";


export const handleMongooseValidateError = (
    err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
    const errorSource: TErrorSource[] = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        }
    );

    return {
        statusCode: 400,
        errorSource,
        message: "validation Error",
    };
};
