-- CreateTable
CREATE TABLE "userList" (
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT NOT NULL,
    "roles" TEXT[],
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "photo" TEXT,
    "wantedPost" TEXT,
    "personalCv" TEXT,
    "mediaLink" TEXT,
    "tags" TEXT,
    "userId" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "like" INTEGER,
    "share" INTEGER,
    "comment" INTEGER,
    "view" INTEGER,
    "total_interactions" INTEGER,

    CONSTRAINT "userList_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userList_username_key" ON "userList"("username");
