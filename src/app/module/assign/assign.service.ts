import type { AssignStatus } from "../../../../generated/prisma/enums";
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
    omit: {
      serviceWorkerId: true,
      complainId: true,
    },
  });

  return result;
};

// const startWork = async (assignId: string, serviceWorkerId: string) => {
//   // 1. Check assignment belongs to this Service Worker
//   const assignment = await prisma.assign.findFirst({
//     where: {
//       id: assignId,
//       serviceWorkerId,
//     },
//   });

//   if (!assignment) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "Assign not found or you are not assigned to this complain",
//     );
//   }

//   // Only PENDING can be started
//   if (assignment.status !== "PENDING") {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "Only PENDING work can be started",
//     );
//   }

//   // 3. Change IN_PROGRESS → COMPLETED
//   const result = await prisma.assign.update({
//     where: {
//       id: assignId,
//     },
//     data: {
//       status: "IN_PROGRESS",
//     },
//     include: {
//       complain: true,
//     },
//   });

//   return result;
// };

// const completeWork = async (
//   assignId: string,
//   serviceWorkerId: string,
// ) => {
//   const assignment = await prisma.assign.findFirst({
//     where: {
//       id: assignId,
//       serviceWorkerId,
//     },
//   });

//   if (!assignment) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "Assign not found or you are not assigned to this complain",
//     );
//   }

//   // Only IN_PROGRESS can be completed
//   if (assignment.status !== "IN_PROGRESS") {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "Work must be IN_PROGRESS before it can be completed",
//     );
//   }

//   // IN_PROGRESS → COMPLETED
//   const result = await prisma.assign.update({
//     where: {
//       id: assignId,
//     },
//     data: {
//       status: "COMPLETED",
//     },
//     include: {
//       complain: true,
//     },
//   });

//   return result;
// };

// const startWork = async (assignId: string, serviceWorkerId: string) => {
//   const assignment = await prisma.assign.findFirst({
//     where: {
//       id: assignId,
//       serviceWorkerId,
//     },
//   });

//   if (!assignment) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "Assign not found or you are not assigned to this complain",
//     );
//   }

//   let newStatus: AssignStatus;

//   // PENDING → IN_PROGRESS
//   if (assignment.status === "PENDING") {
//     newStatus = "IN_PROGRESS";
//   }
//   // IN_PROGRESS → COMPLETED
//   else if (assignment.status === "IN_PROGRESS") {
//     newStatus = "COMPLETED";
//   }

//   // COMPLETED cannot change anymore
//   else {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       "This work is already completed",
//     );
//   }

//   const result = await prisma.assign.update({
//     where: {
//       id: assignId,
//     },
//     data: {
//       status: newStatus,
//     },
//     include: {
//       complain: true,
//     },
//   });

//   return result;
// };

const startWork = async (
  assignId: string,
  serviceWorkerId: string,
  status: AssignStatus,
) => {
  const assignment = await prisma.assign.findFirst({
    where: {
      id: assignId,
      serviceWorkerId,
    },
  });

  if (!assignment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Assign not found or you are not assigned to this complain",
    );
  }

  // PENDING → IN_PROGRESS
  if (assignment.status === "PENDING" && status === "IN_PROGRESS") {
    const result = await prisma.assign.update({
      where: {
        id: assignId,
      },
      data: {
        status: "IN_PROGRESS",
      },
      include: {
        complain: true,
      },
    });

    return result;
  }

  // IN_PROGRESS → COMPLETED
  if (assignment.status === "IN_PROGRESS" && status === "COMPLETED") {
    const result = await prisma.assign.update({
      where: {
        id: assignId,
      },
      data: {
        status: "COMPLETED",
      },
      include: {
        complain: true,
      },
    });

    return result;
  }

  // Prevent PENDING → COMPLETED
  if (assignment.status === "PENDING" && status === "COMPLETED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Work must be IN_PROGRESS before it can be completed",
    );
  }

  // Prevent invalid changes
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `Cannot change status from ${assignment.status} to ${status}`,
  );
};

export const AssignService = {
  assignServiceWorker,
  getMyAssignments,
  startWork,
};
