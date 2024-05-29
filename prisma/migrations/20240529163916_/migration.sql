/*
  Warnings:

  - Added the required column `dados` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dados" TEXT NOT NULL,
ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];
