import z from "zod";

const createAssignValidation = z.object({
  complainId: z.string(),
  serviceWorkerId: z.string(),
});

export const assignValidation = {
  createAssignValidation,
};
