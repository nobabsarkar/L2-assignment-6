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

const startWork = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const serviceWorkerId = req.user?.userId;

  const result = await AssignService.startWork(
    id as string,
    serviceWorkerId as string,
    status,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Work started successfully",
    data: result,
  });
});

const completeWork = catchAsync(async (req, res) => {
  const { assignId } = req.params;

  const serviceWorkerId = req.user?.userId;

  const { proofDescription } = JSON.parse(req.body.data);

  const result = await AssignService.completeWork(
    assignId as string,
    serviceWorkerId as string,
    proofDescription,
    req.file!,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work completed and proof submitted successfully",
    data: result,
  });
});

export const AssignController = {
  assignServiceWorker,
  getMyAssignments,
  startWork,
  completeWork,
};
