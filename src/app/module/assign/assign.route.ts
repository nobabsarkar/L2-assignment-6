import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { AssignController } from "./assign.controller";

const router = Router();

router.post(
  "/assign-service-worker",
  auth(Role.ADMIN, Role.SUPER_ADMIN),
  AssignController.assignServiceWorker,
);

router.get(
  "/my-assignments",
  auth(Role.SERVICE_WORKER),
  AssignController.getMyAssignments,
);

export const AssignRoutes = router;
