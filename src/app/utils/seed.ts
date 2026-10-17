// import bcrypt from "bcryptjs";
// import { Role } from "../../../generated/prisma/enums";
// import config from "../config";
// import { prisma } from "../lib/prisma";
// import { AppError } from "./AppError";
// import httpstatus from "http-status";

// export const seedSuperAdmin = async () => {
//   try {
//     const isSuperAdminExist = await prisma.user.findFirst({
//       where: {
//         role: Role.SUPER_ADMIN,
//       },
//     });

//     if (isSuperAdminExist) {
//       throw new AppError(httpstatus.CONFLICT, "Super Admin already exists");
//     }

//     const name = config.super_admin_name;
//     const email = config.super_admin_email;
//     const password = config.super_admin_password;

//     if (!name || !email || !password) {
//       throw new AppError(
//         httpstatus.NOT_FOUND,
//         "Super Admin Name , Email, Password is Missing.",
//       );
//     }

//     const hashedPassword = await bcrypt.hash(
//       password,
//       Number(config.bcrypt_salt_rounds),
//     );

//     const superAdmin = await prisma.user.create({
//       data: {
//         name,
//         email,
//         role: Role.SUPER_ADMIN,
//         password: hashedPassword,
//         needPasswordChange: false,
//         emailVerified: true,
//       },
//     });

//     console.log("Super Admin Created : ", superAdmin);
//   } catch (error) {
//     console.log("Error Seeding Super Admin : ", error);

//     await prisma.user.delete({
//       where: {
//         email: config.super_admin_email,
//       },
//     });
//   }
// };

import bcrypt from "bcryptjs";
import { Role } from "../../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import { AppError } from "./AppError";
import httpstatus from "http-status";

export const seedSuperAdmin = async () => {
  try {
    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    // Validate environment configuration
    if (!name || !email || !password) {
      throw new AppError(
        httpstatus.NOT_FOUND,
        "Super Admin Name, Email, or Password is Missing.",
      );
    }

    // Check whether a Super Admin already exists
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists. Skipping seeding.");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    // Create Super Admin
    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        role: Role.SUPER_ADMIN,
        password: hashedPassword,
        needPasswordChange: false,
        emailVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log("Super Admin Created:", superAdmin);
  } catch (error) {
    console.error("Error Seeding Super Admin:", error);

    // Do not delete a user inside catch.
    // Let the caller decide whether startup should continue.
    throw error;
  }
};
