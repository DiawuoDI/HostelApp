/*
  Warnings:

  - You are about to drop the `allocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hostel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roomRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_roomsId_fkey";

-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "roomRequest" DROP CONSTRAINT "roomRequest_studentId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_hostelId_fkey";

-- DropTable
DROP TABLE "allocation";

-- DropTable
DROP TABLE "hostel";

-- DropTable
DROP TABLE "roomRequest";

-- DropTable
DROP TABLE "rooms";

-- DropTable
DROP TABLE "student";

-- CreateTable
CREATE TABLE "STUDENT" (
    "studentId" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "department" TEXT,
    "hostelId" TEXT,

    CONSTRAINT "STUDENT_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "ROOMS" (
    "id" TEXT NOT NULL,
    "roomNumder" INTEGER NOT NULL,
    "status" "status" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "blockName" TEXT NOT NULL,
    "hostelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROOMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ALLOCATION" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "roomsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ALLOCATION_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOM_REQUEST" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "status" "options" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ROOM_REQUEST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HOSTEL" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "HOSTEL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ROOMS_roomNumder_key" ON "ROOMS"("roomNumder");

-- CreateIndex
CREATE UNIQUE INDEX "ALLOCATION_studentId_key" ON "ALLOCATION"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ROOM_REQUEST_studentId_key" ON "ROOM_REQUEST"("studentId");

-- AddForeignKey
ALTER TABLE "STUDENT" ADD CONSTRAINT "STUDENT_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "HOSTEL"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOMS" ADD CONSTRAINT "ROOMS_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "HOSTEL"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ALLOCATION" ADD CONSTRAINT "ALLOCATION_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "STUDENT"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ALLOCATION" ADD CONSTRAINT "ALLOCATION_roomsId_fkey" FOREIGN KEY ("roomsId") REFERENCES "ROOMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ROOM_REQUEST" ADD CONSTRAINT "ROOM_REQUEST_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "STUDENT"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
