/*
  Warnings:

  - You are about to drop the column `hostelId` on the `ROOMS` table. All the data in the column will be lost.
  - You are about to drop the column `hostelId` on the `STUDENT` table. All the data in the column will be lost.
  - You are about to drop the `HOSTEL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ROOMS" DROP CONSTRAINT "ROOMS_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "STUDENT" DROP CONSTRAINT "STUDENT_hostelId_fkey";

-- AlterTable
ALTER TABLE "ROOMS" DROP COLUMN "hostelId",
ADD COLUMN     "hallId" TEXT;

-- AlterTable
ALTER TABLE "STUDENT" DROP COLUMN "hostelId",
ADD COLUMN     "hallId" TEXT;

-- DropTable
DROP TABLE "HOSTEL";

-- DropTable
DROP TABLE "admin";

-- CreateTable
CREATE TABLE "HALL" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "HALL_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "STUDENT" ADD CONSTRAINT "STUDENT_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "HALL"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOMS" ADD CONSTRAINT "ROOMS_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "HALL"("id") ON DELETE SET NULL ON UPDATE CASCADE;
