/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-binary-expression */

import { TErrorSource, TGenericErrorResponse } from "../interface/error";


export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode: number = 400;
    const message: string = "Duplicate value not acceptable !!";
    const findDept = err.errorResponse.errmsg.match(/\{[^}]+\}/)?.[0];
    const errorSource: TErrorSource[] = [
        {
            path: err.keyValue,
            message: `${findDept} is already created !` || "",
        },
    ];

    return {
        statusCode,
        message,
        errorSource,
    };
};
