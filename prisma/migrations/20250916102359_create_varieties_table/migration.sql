-- CreateTable
CREATE TABLE "public"."Variety" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cycle" INTEGER NOT NULL,

    CONSTRAINT "Variety_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Variety_name_key" ON "public"."Variety"("name");
