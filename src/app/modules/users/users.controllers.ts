import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./users.service";
import { TUserRole } from "./users.constant";


const blockedUser=catchAsync(async (req, res) => {
    const id: string = req.params.id;
    const result = await userService.blockedUserIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is blocked !!",
        data: result,
    });
}); 

const deletUser=catchAsync(async (req, res) => {
    const id: string = req.params.id;
    const result = await userService.deletUserIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User is deleted !!",
        data: result,
    });
}); 

const changeRole=catchAsync(async (req, res) => {
    const id: string = req.params.id;
    const role: TUserRole = req.body.role;
    const result = await userService.changeUserRoleIntoDB(id,role)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User role changed !!",
        data: result,
    });
}); 

const getAllUser = catchAsync(async (req, res) => {
    const query: Record<string,unknown>=req.query
    const result= await userService.getAllUserFromDB(query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get all users!!",
        meta:result.meta,
        data: result.result,
    });
})

export const userControllers = {
    blockedUser,
    deletUser,
    getAllUser,
    changeRole
}