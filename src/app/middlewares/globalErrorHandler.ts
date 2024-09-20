/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";

import config from "../config";
import { handleZodError } from "../errors/handleZodError";
import { handleMongooseValidateError } from "../errors/handleMongooseValidateError";
import { handleCastError } from "../errors/handleCastError";

import AppError from "../errors/appError";
import { handleDuplicateError } from "../errors/handleDuplicateErrors";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "an unexpected error occur";
    let errorSource: TErrorSource[] = [
        {
            path: "",
            message: "something went wrong",
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        errorSource = simplifiedError?.errorSource;
        message = simplifiedError?.message;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleMongooseValidateError(err);
        statusCode = simplifiedError?.statusCode;
        errorSource = simplifiedError?.errorSource;
        message = simplifiedError?.message;
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        errorSource = simplifiedError?.errorSource;
        message = simplifiedError?.message;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        errorSource = simplifiedError?.errorSource;
        message = simplifiedError?.message;
    } else if (err instanceof AppError) {
        (message = err.message),
            (errorSource = [
                {
                    path: "",
                    message: err?.message,
                },
            ]);
    } else if (err instanceof Error) {
        (message = err.message),
            (errorSource = [
                {
                    path: "",
                    message: err?.message,
                },
            ]);
    }

    res.status(statusCode).json({
        success: false,
        errorSource,
        message,
        stack: config.NODE_ENV === "development" ? err.stack : null,
        err
    });
};