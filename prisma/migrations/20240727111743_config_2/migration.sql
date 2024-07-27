/*
  Warnings:

  - The primary key for the `Config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Config` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `value` on the `Config` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Config" DROP CONSTRAINT "Config_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" BOOLEAN NOT NULL,
ADD CONSTRAINT "Config_pkey" PRIMARY KEY ("id");
