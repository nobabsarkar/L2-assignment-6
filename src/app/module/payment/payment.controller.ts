import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";

const initiatePayment = catchAsync(async (req, res) => {
  const { complainId } = req.body;

  const userId = req.user?.id as string;

  const paymentUrl = await paymentService.initiateComplaintPayment(
    complainId,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment initiated successfully",
    data: paymentUrl,
  });
});

export const paymentController = {
  initiatePayment,
};
