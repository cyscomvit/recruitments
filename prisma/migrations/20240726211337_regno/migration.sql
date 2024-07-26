/*
  Warnings:

  - A unique constraint covering the columns `[regno]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_regno_key" ON "User"("regno");
