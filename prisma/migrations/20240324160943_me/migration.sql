-- CreateEnum
CREATE TYPE "status" AS ENUM ('Vacant', 'Occupied', 'Partially_Occupied');

-- CreateEnum
CREATE TYPE "options" AS ENUM ('Rejected', 'Approved', 'Pending');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "studentId" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "department" TEXT,
    "hostelId" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "roomNumder" INTEGER NOT NULL,
    "status" "status" NOT NULL,
    "blockName" TEXT NOT NULL,
    "hostelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "roomsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roomRequest" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "status" "options" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roomRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "hostel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomNumder_key" ON "rooms"("roomNumder");

-- CreateIndex
CREATE UNIQUE INDEX "allocation_studentId_key" ON "allocation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "roomRequest_studentId_key" ON "roomRequest"("studentId");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "hostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "hostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_roomsId_fkey" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomRequest" ADD CONSTRAINT "roomRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
