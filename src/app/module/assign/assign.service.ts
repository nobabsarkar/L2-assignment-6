import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";

const assignServiceWorker = async (
  complainId: string,
  serviceWorkerId: string,
) => {
  // 1. Check complain exists
  const complain = await prisma.complain.findUnique({
    where: {
      id: complainId,
    },
  });

  if (!complain) {
    throw new AppError(httpStatus.NOT_FOUND, "Complain not found");
  }

  // 2. Check service worker exists
  const serviceWorker = await prisma.user.findUnique({
    where: {
      id: serviceWorkerId,
    },
  });

  if (!serviceWorker) {
    throw new AppError(httpStatus.NOT_FOUND, "Service worker not found");
  }

  // 3. Make sure selected user is actually a SERVICE_WORKER
  if (serviceWorker.role !== "SERVICE_WORKER") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Selected user is not a service worker",
    );
  }

  // 5. Check if this complain is already assigned
  const existingAssign = await prisma.assign.findFirst({
    where: {
      complainId,
    },
  });

  if (existingAssign) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This complain is already assigned",
    );
  }

  // 6. Create assignment
  const result = await prisma.assign.create({
    data: {
      complainId,
      serviceWorkerId,
    },
    include: {
      complain: true,
      serviceWorker: {
        omit: {
          password: true,
        },
      },
    },
  });

  return result;
};

const getMyAssignments = async (serviceWorkerId: string) => {
  const result = await prisma.assign.findMany({
    where: {
      serviceWorkerId,
    },
    include: {
      complain: true,
      serviceWorker: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const AssignService = {
  assignServiceWorker,
  getMyAssignments,
};
