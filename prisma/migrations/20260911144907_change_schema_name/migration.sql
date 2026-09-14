/*
  Warnings:

  - You are about to drop the column `serviceFee` on the `complains` table. All the data in the column will be lost.
  - Added the required column `userId` to the `complains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "complains" DROP COLUMN "serviceFee",
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "complains" ADD CONSTRAINT "complains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
