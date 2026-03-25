/// <reference types="node" />
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { eventSeedData } from "./eventSeedData";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: eventSeedData.map(e => ({
      name: e.name,
      date: new Date(e.date),
      location: e.location,
      details: JSON.stringify(e.details)
    })),
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });