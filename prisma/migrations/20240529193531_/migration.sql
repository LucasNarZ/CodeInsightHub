-- DropIndex
DROP INDEX "pessoas_search_vector_idx";

-- AlterTable
ALTER TABLE "pessoas" ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];
