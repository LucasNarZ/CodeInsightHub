/*
  Warnings:

  - Added the required column `search_vector` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "search_vector" VARCHAR(100) NOT NULL,
ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];
