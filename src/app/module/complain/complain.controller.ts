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

export const complainController = {
  createComplain,
};
