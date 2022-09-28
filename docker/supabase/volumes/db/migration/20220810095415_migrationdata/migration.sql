/*
  Warnings:

  - You are about to drop the column `contractId` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_contractId_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "contractId",
ALTER COLUMN "userId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ContractsOnCandidate" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "contractId" TEXT,
    "candidateId" TEXT,

    CONSTRAINT "ContractsOnCandidate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContractsOnCandidate" ADD CONSTRAINT "ContractsOnCandidate_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractsOnCandidate" ADD CONSTRAINT "ContractsOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
