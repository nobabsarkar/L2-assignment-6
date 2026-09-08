import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import type { Request, Response } from "express";

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error("No File Provided.");
  }

  const userId = req.user?.userId;

  const result = await UserService.uploadProfileImage(
    req?.file?.buffer,
    userId as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Profile Picture Uploaded Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Retrieved Successfully",
    data: result,
  });
});

export const UserController = {
  uploadProfileImage,
  getAllUsers,
};
