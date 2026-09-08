import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { Role } from "../../../../generated/prisma/enums";
import httpStatus from "http-status";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    // select: {
    //   imagePublicId: true,
    //   imageUrl: true,
    // },
  });

  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },

          async (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(new Error("No Result returned from Cloudinary"));
            }

            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      imageUrl: cloudinaryResult?.secure_url,
      imagePublicId: cloudinaryResult?.public_id,
    },

    omit: {
      password: true,
    },
  });

  if (currentUser?.imagePublicId && currentUser?.imageUrl) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId);
  }

  return updatedUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUserRole = async (userId: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
    omit: {
      password: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  getAllUsers,
  uploadProfileImage,
  updateUserRole,
};
