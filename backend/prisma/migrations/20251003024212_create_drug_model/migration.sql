-- CreateTable
CREATE TABLE "Drug" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "genericName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drug_code_key" ON "Drug"("code");
