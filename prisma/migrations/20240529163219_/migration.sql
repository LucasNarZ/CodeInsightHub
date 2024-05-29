/*
  Warnings:

  - You are about to drop the column `dados` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dados",
ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];
