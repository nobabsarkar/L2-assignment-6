import type { ComplainStatus } from "../../../../generated/prisma/enums";
import type { ComplainWhereInput } from "../../../../generated/prisma/models";
import type { IQuery } from "../../interface";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
  ICreateComplain,
  UpdateComplainPayload,
} from "./complain.interface";
import httpStatus from "http-status";

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

const citezenOwnComplain = async (userId: string) => {
  const complains = await prisma.complain.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return complains;
};

const getSingleComplain = async (id: string) => {
  const complain = await prisma.complain.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  return complain;
};

const updateComplain = async (
  id: string,
  userId: string,
  payload: UpdateComplainPayload,
) => {
  const complain = await prisma.complain.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!complain) {
    throw new AppError(404, "Complain not found or you are not authorized");
  }

  const updatedComplain = await prisma.complain.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  return updatedComplain;
};

const deleteComplain = async (id: string) => {
  const result = await prisma.complain.delete({
    where: { id },
  });

  return result;
};

const adminGetAllComplains = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: ComplainWhereInput[] = [];

  // Searching
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: query.searchTerm, mode: "insensitive" } },
        { location: { contains: query.searchTerm, mode: "insensitive" } },
      ],
    });
  }

  // filtering
  if (query.status) {
    andConditions.push({
      status: query.status.toUpperCase() as ComplainStatus,
    });
  }

  if (query.minPrice || query.maxPrice) {
    andConditions.push({
      price: {
        ...(query.minPrice && {
          gte: Number(query.minPrice),
        }),
        ...(query.maxPrice && {
          lte: Number(query.maxPrice),
        }),
      },
    });
  }

  const result = await prisma.complain.findMany({
    where: {
      AND: andConditions,
    },

    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return result;
};

const adminUpdateComplainStatus = async (
  complainId: string,
  status: ComplainStatus,
) => {
  const complain = await prisma.complain.findUnique({
    where: {
      id: complainId,
    },
  });

  if (!complain) {
    throw new AppError(httpStatus.NOT_FOUND, "Complain not found");
  }

  const result = await prisma.complain.update({
    where: {
      id: complainId,
    },
    data: {
      status,
    },
  });

  return result;
};

export const ComplainService = {
  createComplain,
  citezenOwnComplain,
  updateComplain,
  getSingleComplain,
  deleteComplain,
  adminGetAllComplains,
  adminUpdateComplainStatus,
};
