/*
  Warnings:

  - You are about to drop the column `search_vector` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "search_vector",
ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];
