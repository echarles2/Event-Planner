/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `AvailabilityEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AvailabilityEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Checklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AvailabilityEntry_date_key";

-- AlterTable
ALTER TABLE "AvailabilityEntry" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Checklist" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityEntry_userId_date_key" ON "AvailabilityEntry"("userId", "date");

-- AddForeignKey
ALTER TABLE "AvailabilityEntry" ADD CONSTRAINT "AvailabilityEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
