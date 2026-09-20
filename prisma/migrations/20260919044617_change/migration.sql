/*
  Warnings:

  - The `status` column on the `complains` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ComplainStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymenStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "complains" DROP COLUMN "status",
ADD COLUMN     "status" "ComplainStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" "PaymenStatus" NOT NULL;

-- DropEnum
DROP TYPE "ComplaintStatus";

-- DropEnum
DROP TYPE "PaymentStatus";
