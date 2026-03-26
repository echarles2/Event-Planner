-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "details" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
