/*
  Warnings:

  - You are about to drop the column `minExperience` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "minExperience",
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "offerMode" TEXT;
