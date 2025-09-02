-- CreateTable
CREATE TABLE "public"."Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "sprayTank" TEXT,
    "fertilizerSpreader" TEXT,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Input" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "commercialBrand" TEXT NOT NULL,
    "activeIngredient" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "farmId" INTEGER NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Planting" (
    "id" SERIAL NOT NULL,
    "crop" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "plantingDate" TIMESTAMP(3) NOT NULL,
    "farmId" INTEGER NOT NULL,
    "plotId" INTEGER NOT NULL,

    CONSTRAINT "Planting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FarmToInput" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FarmToInput_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "public"."Client"("email");

-- CreateIndex
CREATE INDEX "_FarmToInput_B_index" ON "public"."_FarmToInput"("B");

-- AddForeignKey
ALTER TABLE "public"."Farm" ADD CONSTRAINT "Farm_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plot" ADD CONSTRAINT "Plot_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Planting" ADD CONSTRAINT "Planting_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Planting" ADD CONSTRAINT "Planting_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "public"."Plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FarmToInput" ADD CONSTRAINT "_FarmToInput_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FarmToInput" ADD CONSTRAINT "_FarmToInput_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Input"("id") ON DELETE CASCADE ON UPDATE CASCADE;
