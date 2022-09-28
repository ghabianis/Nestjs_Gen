-- CreateTable
CREATE TABLE "CommunityPosts" (
    "id" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "entrepriseId" TEXT,
    "userId" TEXT,
    "publicationId" TEXT,
    "communityId" TEXT,
    "candidateId" TEXT,
    "shares" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "title" TEXT,
    "username" TEXT NOT NULL,
    "communityName" TEXT,
    "entrepriseName" TEXT,
    "description" TEXT,
    "isLike" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPosts_id_key" ON "CommunityPosts"("id");
