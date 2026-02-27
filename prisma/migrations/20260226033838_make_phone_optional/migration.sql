-- DropIndex
DROP INDEX "Member_phone_key";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "phone" DROP NOT NULL;
