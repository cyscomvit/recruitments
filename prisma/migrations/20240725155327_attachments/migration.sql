-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSelected" BOOLEAN DEFAULT false,
ADD COLUMN     "previousWork1" TEXT,
ADD COLUMN     "previousWork2" TEXT;
