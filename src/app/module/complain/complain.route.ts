import { Router } from "express";

import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { complainController } from "./complain.controller";
import { upload } from "../../lib/multer";
import { validateRequest } from "../../middleware/validateRequest";
import { complainValidation } from "./complain.validation";

const router = Router();

router.post(
  "/create-complain",
  auth(Role.CITIZEN),
  upload.single("image"),
  validateRequest(complainValidation.CreateComplainValidationSchema),
  complainController.createComplain,
);

router.get(
  "/my-complains",
  auth(Role.CITIZEN),
  complainController.getMyComplaints,
);

router.patch("/:id", auth(Role.CITIZEN), complainController.updateComplain);

export const ComplainRoutes = router;
