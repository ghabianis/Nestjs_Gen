/*
  Warnings:

  - You are about to drop the `ApplyedOffersNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscribedEventsNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "offerId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "statue" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "event" DROP NOT NULL,
ALTER COLUMN "posterId" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "publicationType" DROP NOT NULL;

-- DropTable
DROP TABLE "ApplyedOffersNotification";

-- DropTable
DROP TABLE "SubscribedEventsNotification";
