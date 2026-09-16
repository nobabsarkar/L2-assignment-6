import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ICreateComplain } from "./complain.interface";

interface UpdateComplaintPayload {
  title?: string;
  description?: string;
  location?: string;
}

const createComplain = async (
  payload: ICreateComplain,
  userId: string,
  image: Express.Multer.File | null,
) => {
  let imageUrl = "";
  let imagePublicId = "";

  if (image) {
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(new Error("No result returned from Cloudinary"));
            }

            resolve(result);
          },
        )
        .end(image.buffer);
    });

    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
  }

  const complain = await prisma.complain.create({
    data: {
      ...payload,

      userId,

      imageUrl,
      imagePublicId,
    },
  });

  return complain;
};

const getMyComplaints = async (userId: string) => {
  const complaints = await prisma.complain.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return complaints;
};

const updateComplain = async (
  id: string,
  userId: string,
  payload: UpdateComplaintPayload,
) => {
  const complaint = await prisma.complain.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!complaint) {
    throw new AppError(404, "Complaint not found or you are not authorized");
  }

  const updatedComplaint = await prisma.complain.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return updatedComplaint;
};

export const complainService = {
  createComplain,
  getMyComplaints,
  updateComplain,
};
