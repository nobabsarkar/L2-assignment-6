import express from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/create-payment",
  auth(Role.CITIZEN),
  paymentController.initiatePayment,
);

router.post("/complain-confirm", paymentController.verifyPayment);

router.get(
  "/get-all-payments",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  paymentController.getAllPayments,
);

export const PaymentRoutes = router;
