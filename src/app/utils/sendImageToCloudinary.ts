import type { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../lib/cloudinary";

export const sendImageToCloudinary = async (
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      },
    );

    uploadStream.end(buffer);
  });
};
