-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedDept" TEXT[] DEFAULT ARRAY[]::TEXT[];
