import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { AssignController } from "./assign.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { assignValidation } from "./assign.validation";
import { upload } from "../../lib/multer";
import { complainValidation } from "../complain/complain.validation";

const router = Router();

router.post(
  "/assign-service-worker",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(assignValidation.createAssignValidation),
  AssignController.assignServiceWorker,
);

router.get(
  "/service-wroker-assign",
  auth(Role.SERVICE_WORKER),
  AssignController.getMyAssignments,
);

router.patch(
  "/:id",
  auth(Role.SERVICE_WORKER),
  validateRequest(assignValidation.updateAssginValidation),
  AssignController.startWork,
);

router.patch(
  "/:assignId/complete-work",
  auth(Role.SERVICE_WORKER),
  upload.single("proofImage"),
  validateRequest(complainValidation.completeWorkValidationSchema),
  AssignController.completeWork,
);

router.get(
  "/citizen-complain-status",
  auth(Role.CITIZEN),
  AssignController.citizenSeeComplainWorkStatus,
);

export const AssignRoutes = router;
