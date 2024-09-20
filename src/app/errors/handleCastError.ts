import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";


export const handleCastError = (
    err: mongoose.CastError
): TGenericErrorResponse => {
    const statusCode: number = 400;
    const message: string = "Invalid Id !";
    const errorSource: TErrorSource[] = [
        {
            path: err.path,
            message: err.message,
        },
    ];

    return {
        statusCode,
        message,
        errorSource,
    };
};
