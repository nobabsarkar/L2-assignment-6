-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imagePublicId" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL;
