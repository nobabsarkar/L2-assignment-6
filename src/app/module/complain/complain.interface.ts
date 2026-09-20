import type { ComplainStatus } from "../../../../generated/prisma/enums";

export interface ICreateComplain {
  title: string;
  description: string;
  location: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  status?: ComplainStatus;
  price: number;
  userId: string;
}

export interface UpdateComplainPayload {
  title?: string;
  description?: string;
  location?: string;
}
