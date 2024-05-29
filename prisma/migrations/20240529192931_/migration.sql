-- AlterTable
ALTER TABLE "pessoas" ALTER COLUMN "stack" SET DEFAULT ARRAY[]::VARCHAR(32)[];

-- CreateIndex
CREATE INDEX "pessoas_search_vector_idx" ON "pessoas"("search_vector");
