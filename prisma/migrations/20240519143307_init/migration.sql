/*
  Warnings:

  - You are about to drop the column `Stack` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Stack",
ADD COLUMN     "stack" TEXT[];
