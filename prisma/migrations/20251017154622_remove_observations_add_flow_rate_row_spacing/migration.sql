/*
  Warnings:

  - You are about to drop the column `observations` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "observations",
ADD COLUMN     "flowRate" DOUBLE PRECISION,
ADD COLUMN     "rowSpacing" DOUBLE PRECISION;
