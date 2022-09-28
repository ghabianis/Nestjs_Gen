/*
  Warnings:

  - You are about to drop the column `type` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "type",
ALTER COLUMN "entrepriseId" SET DEFAULT current_entreprise_id();
