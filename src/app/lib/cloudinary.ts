import config from "../config";
import { v2 as Cloudinary } from "cloudinary";

// Configure Cloudinary (use you own cloud_name, api_key, and api_secret)
Cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_cloud_key,
  api_secret: config.cloudinary_cloud_secret,
});

export const cloudinary = Cloudinary;
