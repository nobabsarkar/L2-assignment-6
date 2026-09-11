import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { complainService } from "./complain.service";
import httpStatus from "http-status";

const createComplain = catchAsync(async (req, res) => {
  const result = await complainService.createComplain(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Complain Created Successfully",
    data: result,
  });
});

export const complainController = {
  createComplain,
};
