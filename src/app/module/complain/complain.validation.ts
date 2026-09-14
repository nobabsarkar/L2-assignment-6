import { z } from "zod";

const CreateComplainValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  price: z.number(),
});

export const complainValidation = {
  CreateComplainValidationSchema,
};
