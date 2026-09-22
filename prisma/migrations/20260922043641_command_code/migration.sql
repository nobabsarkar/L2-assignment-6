/*
  Warnings:

  - You are about to drop the column `adminId` on the `assigns` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "assigns" DROP CONSTRAINT "assigns_adminId_fkey";

-- AlterTable
ALTER TABLE "assigns" DROP COLUMN "adminId";
