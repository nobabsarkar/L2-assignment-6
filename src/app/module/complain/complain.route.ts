import { Router } from "express";

import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { complainController } from "./complain.controller";

const router = Router();

router.post(
  "/create-complain",
  auth(Role.CITIZEN),
  complainController.createComplain,
);

export const ComplainRoutes = router;
