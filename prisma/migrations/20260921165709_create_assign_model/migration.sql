-- CreateEnum
CREATE TYPE "AssignStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "assigns" (
    "id" TEXT NOT NULL,
    "status" "AssignStatus" NOT NULL DEFAULT 'PENDING',
    "complainId" TEXT NOT NULL,
    "serviceWorkerId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assigns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assigns" ADD CONSTRAINT "assigns_complainId_fkey" FOREIGN KEY ("complainId") REFERENCES "complains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigns" ADD CONSTRAINT "assigns_serviceWorkerId_fkey" FOREIGN KEY ("serviceWorkerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assigns" ADD CONSTRAINT "assigns_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
