import type { ComplaintStatus } from "../../../../generated/prisma/enums";

export interface ICreateComplain {
  title: string;
  description: string;
  location: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  status?: ComplaintStatus;
  serviceFee?: number | null;
}
