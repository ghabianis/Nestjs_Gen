-- CreateTable
CREATE TABLE "Notification" (
    "userId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "posterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "publicationType" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplyedOffersNotification" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "statue" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplyedOffersNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribedEventsNotification" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "SubscribedEventsNotification_pkey" PRIMARY KEY ("id")
);
