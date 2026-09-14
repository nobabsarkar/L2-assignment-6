import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import type { ICreateComplain } from "./complain.interface";

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

export const complainService = {
  createComplain,
};
