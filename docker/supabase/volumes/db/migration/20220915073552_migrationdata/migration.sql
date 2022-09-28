/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Entreprise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entreprise" DROP COLUMN "coverImage",
DROP COLUMN "email",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- CreateTable
CREATE TABLE "UserFeatures" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT,
    "photo" TEXT,
    "title" TEXT,
    "link" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFeatures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFeatures" ADD CONSTRAINT "UserFeatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

