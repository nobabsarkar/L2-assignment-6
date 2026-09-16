import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { complainService } from "./complain.service";
import httpStatus from "http-status";

const createComplain = catchAsync(async (req, res) => {
  const image = req.file || null;
  const payload = req.body;

  const result = await complainService.createComplain(
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

  const result = await complainService.getMyComplaints(userId as string);

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

  const result = await complainService.updateComplain(
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

export const complainController = {
  createComplain,
  getMyComplaints,
  updateComplain,
};
