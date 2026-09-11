import { prisma } from "../../lib/prisma";
import type { ICreateComplain } from "./complain.interface";

const createComplain = async (payload: ICreateComplain) => {
  const complain = await prisma.complain.create({
    data: payload,
  });
  return complain;
};

export const complainService = {
  createComplain,
};
