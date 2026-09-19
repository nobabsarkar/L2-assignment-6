import config from "../../config";
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";

const initiateComplaintPayment = async (complainId: string, userId: string) => {
  // 1. User খুঁজে বের করা
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  // 2. Complaint খুঁজে বের করা
  const complain = await prisma.complain.findUniqueOrThrow({
    where: {
      id: complainId,
    },
  });

  // 3. Complaint-এর owner কিনা check
  if (complain.userId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can only pay for your own complaint.",
    );
  }

  // 4. Price আছে কিনা check
  if (!complain.price || complain.price <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This complaint does not require payment.",
    );
  }

  // 5. Transaction ID
  const tranId = `COMPLAIN_TRNX_${Date.now()}`;

  // 6. SSLCommerz payment data
  const paymentData = {
    store_id: config.ssl_commerz_store_id,
    store_passwd: config.ssl_commerz_store_password,

    total_amount: complain.price,
    currency: "BDT",
    tran_id: tranId,

    success_url: `${config.app_url}/api/v1/payments/complaint-confirm?complainId=${complainId}&tranId=${tranId}&status=success`,

    fail_url: `${config.app_url}/api/v1/payments/complaint-confirm?complainId=${complainId}&tranId=${tranId}&status=fail`,

    cancel_url: `${config.app_url}/api/v1/payments/complaint-confirm?complainId=${complainId}&tranId=${tranId}&status=cancel`,

    cus_name: user.name,
    cus_email: user.email,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "Rajshahi",
    cus_state: "Rajshahi",
    cus_postcode: 6000,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
  };

  // 7. SSLCommerz request
  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    paymentData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const data = response.data;

  // 8. Payment database-এ save
  await prisma.payment.create({
    data: {
      transactionId: tranId,
      complainId: complainId,
      userId: userId,
      amount: complain.price,
      status: "PENDING",
    },
  });

  // 9. SSLCommerz Gateway URL return
  return data?.GatewayPageURL;
};

export const paymentService = {
  initiateComplaintPayment,
};
