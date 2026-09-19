import express from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/initiate-payment",
  auth(Role.CITIZEN),
  paymentController.initiatePayment,
);

export const PaymentRoutes = router;
