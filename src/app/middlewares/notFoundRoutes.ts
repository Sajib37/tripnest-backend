/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";


export const notFound=(req: Request, res: Response, next: NextFunction) => {

    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message:"Oops! This route doesn't exist.",
      error: ""
    })
}