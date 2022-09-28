-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;
