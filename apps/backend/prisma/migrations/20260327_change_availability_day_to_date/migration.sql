-- AlterTable
ALTER TABLE "AvailabilityEntry" DROP COLUMN "day",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityEntry_date_key" ON "AvailabilityEntry"("date");

