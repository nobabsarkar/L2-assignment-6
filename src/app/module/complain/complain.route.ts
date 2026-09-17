import { Router } from "express";

import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

import { upload } from "../../lib/multer";
import { validateRequest } from "../../middleware/validateRequest";
import { complainValidation } from "./complain.validation";
import { ComplainController } from "./complain.controller";

const router = Router();

router.post(
  "/create-complain",
  auth(Role.CITIZEN),
  upload.single("image"),
  validateRequest(complainValidation.CreateComplainValidationSchema),
  ComplainController.createComplain,
);

router.get(
  "/my-complains",
  auth(Role.CITIZEN),
  ComplainController.getMyComplaints,
);

router.get("/:id", ComplainController.getSingleComplain);

router.patch(
  "/:id",
  auth(Role.CITIZEN),
  validateRequest(complainValidation.UpdateComplainValidationSchema),
  ComplainController.updateComplain,
);

router.delete("/:id", ComplainController.deleteComplain);

router.patch(
  "/admin-update-status/:id",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  ComplainController.adminUpdateComplainStatus,
);

export const ComplainRoutes = router;
