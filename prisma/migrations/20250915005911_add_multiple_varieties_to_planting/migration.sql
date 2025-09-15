/*
  Warnings:

  - You are about to drop the column `variety` on the `Planting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Planting" DROP COLUMN "variety",
ADD COLUMN     "varieties" TEXT[];
