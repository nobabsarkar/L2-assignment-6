import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { AssignController } from "./assign.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { assignValidation } from "./assign.validation";

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

export const AssignRoutes = router;
