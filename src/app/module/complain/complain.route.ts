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

export const ComplainRoutes = router;
