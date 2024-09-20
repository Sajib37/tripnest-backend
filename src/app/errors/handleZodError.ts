import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleZodError = (err: ZodError): TGenericErrorResponse=> {
    const errorSource: TErrorSource[] = err.issues.map((issue: ZodIssue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    const statusCode:number = 400;
    return {
        statusCode,
        message: "Check your input, validation failed!",
        errorSource,
    };
};