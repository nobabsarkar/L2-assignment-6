import type { AssignStatus } from "../../../../generated/prisma/enums";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

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

  // Only PENDING → IN_PROGRESS is allowed
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

  // Cannot complete work from this endpoint
  if (status === "COMPLETED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot complete the work here. Submit proof to complete the work.",
    );
  }

  // Prevent any other invalid status change
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `Cannot change status from ${assignment.status} to ${status}`,
  );
};

const completeWork = async (
  assignId: string,
  serviceWorkerId: string,
  proofDescription: string,
  proofImage: Express.Multer.File,
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

  if (assignment.status !== "IN_PROGRESS") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You must start the work before submitting proof",
    );
  }

  if (!proofImage) {
    throw new AppError(httpStatus.BAD_REQUEST, "Proof image is required");
  }

  const uploadedImage = await sendImageToCloudinary(
    proofImage.buffer,
    "citycare/complain-proofs",
  );

  const result = await prisma.$transaction(async (tx) => {
    // Complain → RESOLVED
    const complain = await tx.complain.update({
      where: {
        id: assignment.complainId,
      },
      data: {
        proofImageUrl: uploadedImage.secure_url,
        proofImagePublicId: uploadedImage.public_id,
        proofDescription,
      },
    });

    // Assignment → COMPLETED
    const assign = await tx.assign.update({
      where: {
        id: assignId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return {
      assign,
      complain,
    };
  });

  return result;
};

const citizenSeeComplainWorkStatus = async (citizenId: string) => {
  const result = await prisma.assign.findMany({
    where: {
      complain: {
        userId: citizenId,
      },
    },
    include: {
      complain: true,

      serviceWorker: {
        omit: {
          password: true,
        },
      },
    },
    omit: {
      complainId: true,
      serviceWorkerId: true,
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
  startWork,
  completeWork,
  citizenSeeComplainWorkStatus,
};
