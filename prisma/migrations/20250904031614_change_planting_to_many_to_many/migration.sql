/*
  Warnings:

  - You are about to drop the column `plotId` on the `Planting` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Planting" DROP CONSTRAINT "Planting_plotId_fkey";

-- AlterTable
ALTER TABLE "public"."Planting" DROP COLUMN "plotId";

-- CreateTable
CREATE TABLE "public"."_PlantingToPlot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlantingToPlot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlantingToPlot_B_index" ON "public"."_PlantingToPlot"("B");

-- AddForeignKey
ALTER TABLE "public"."_PlantingToPlot" ADD CONSTRAINT "_PlantingToPlot_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Planting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PlantingToPlot" ADD CONSTRAINT "_PlantingToPlot_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
