-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "Stack" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_apelido_key" ON "User"("apelido");
