/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL,
    "apelido" VARCHAR(32) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "nascimento" TEXT NOT NULL,
    "stack" VARCHAR(32)[] DEFAULT ARRAY[]::VARCHAR(32)[],
    "search_vector" TEXT NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_apelido_key" ON "pessoas"("apelido");
