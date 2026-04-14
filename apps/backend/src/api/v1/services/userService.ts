import prisma from "../../../../prisma/client.js";

export async function checkAppUser(clerkUserId: string) {
    return prisma.user.upsert({
        where: { clerkUserId },
        update: {},
        create: { clerkUserId },
    });
}