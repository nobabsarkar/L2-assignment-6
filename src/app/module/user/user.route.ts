import { Router } from "express";
import { UserController } from "./user.controller";
// import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { upload } from "../../lib/multer";

const router = Router();

router.patch(
  "/profile-image",

  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CITIZEN),

  upload.single("profileImage"),

  UserController.uploadProfileImage,
);

router.get(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CITIZEN),
  UserController.getAllUsers,
);

router.patch("/:id", auth(Role.SUPER_ADMIN), UserController.updateUserRole);

export const UserRoutes = router;
