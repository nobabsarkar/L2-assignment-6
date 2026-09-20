import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";

const initiatePayment = catchAsync(async (req, res) => {
  const { payment } = req?.body;

  const userId = req.user?.userId as string;

  const paymentUrl = await paymentService.initiateComplainPayment(
    payment,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment initiated successfully",
    data: {
      paymentUrl,
    },
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const { complainId, tranId, status } = req.query;

  const payload = req.body;

  const result = await paymentService.validatePayment(
    complainId as string,
    tranId as string,
    status as string,
    payload,
  );

  if (result === "success") {
    res.redirect(
      `http://localhost:3000/tenant-dashboard/payment-success/${tranId}`,
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment verified successfully",
    data: result,
  });
});

const getAllPayments = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPayments();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All payments retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  initiatePayment,
  verifyPayment,
  getAllPayments,
};
