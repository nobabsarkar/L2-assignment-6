import z from "zod";

const createAssignValidation = z.object({
  complainId: z.string(),
  serviceWorkerId: z.string(),
});

const updateAssginValidation = z.object({
  status: z.string(),
});

export const assignValidation = {
  createAssignValidation,
  updateAssginValidation,
};
