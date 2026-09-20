import { z } from "zod";

const CreateComplainValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  price: z.number(),
});

const UpdateComplainValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
});

export const complainValidation = {
  CreateComplainValidationSchema,
  UpdateComplainValidationSchema,
};
