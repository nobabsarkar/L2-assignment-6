import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AssignService } from "./assign.service";

const assignServiceWorker = catchAsync(async (req, res) => {
  const { complainId, serviceWorkerId } = req.body;

  const result = await AssignService.assignServiceWorker(
    complainId,
    serviceWorkerId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service worker assigned successfully",
    data: result,
  });
});

const getMyAssignments = catchAsync(async (req, res) => {
  const serviceWorkerId = req.user?.userId;

  const result = await AssignService.getMyAssignments(
    serviceWorkerId as string,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Assigned complains retrieved successfully",
    data: result,
  });
});

export const AssignController = {
  assignServiceWorker,
  getMyAssignments,
};
