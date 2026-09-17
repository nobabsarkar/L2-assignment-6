import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ComplainService } from "./complain.service";

const createComplain = catchAsync(async (req, res) => {
  const image = req.file || null;
  const payload = req.body;

  const result = await ComplainService.createComplain(
    payload,
    req?.user?.userId as string,
    image,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Complain Created Successfully",
    data: result,
  });
});

const getMyComplaints = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;

  const result = await ComplainService.getMyComplaints(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your complaints retrieved successfully",
    data: result,
  });
});

const updateComplain = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?.userId;

  const result = await ComplainService.updateComplain(
    id as string,
    userId as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Complaint updated successfully",
    data: result,
  });
});

const getSingleComplain = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ComplainService.getSingleComplain(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Complaint retrieved successfully",
    data: result,
  });
});

const deleteComplain = catchAsync(async (req, res) => {
  const { id } = req.params;

  await ComplainService.deleteComplain(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Complain deleted successfully",
    data: null,
  });
});

const adminUpdateComplainStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await ComplainService.adminUpdateComplainStatus(
    id as string,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Complaint status updated successfully",
    data: result,
  });
});

export const ComplainController = {
  createComplain,
  getMyComplaints,
  updateComplain,
  getSingleComplain,
  deleteComplain,
  adminUpdateComplainStatus,
};
