-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "Publication" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "Recruiter" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "Socialinterraction" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "UsersOnCommunity" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "UsersOnEntreprise" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();

-- AlterTable
ALTER TABLE "UsersSkill" ALTER COLUMN "userId" SET DEFAULT requesting_user_id();
