import prisma from "../../../../prisma/client.js";
import { AvailabilityEntry } from "../../../../generated/prisma/client.js";

export const getAllAvailability = async (userId: string): Promise<AvailabilityEntry[]> => {
    return prisma.availabilityEntry.findMany({
        where: { userId },
        orderBy: {
            date: "asc"
        }
    });
};

export const saveAvailability = async (
    userId: string,
    date: Date,
    status: "available" | "unavailable"
): Promise<AvailabilityEntry> => {
    const existing = await prisma.availabilityEntry.findFirst({
        where: { userId, date }
    });

    if (existing) {
        return prisma.availabilityEntry.update({
            where: { id: existing.id },
            data: { status }
        });
    }

    return prisma.availabilityEntry.create({
        data: { userId, date, status }
    });
};

export const deleteAvailabilityByDate = async (userId: string, date: Date): Promise<AvailabilityEntry | null> => {
    const existing = await prisma.availabilityEntry.findFirst({
        where: { userId, date }
    });

    if (!existing) {
        return null;
    }

    return prisma.availabilityEntry.delete({
        where: { id: existing.id }
    });
};