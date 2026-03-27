import prisma from "../../../../prisma/client";
import { AvailabilityEntry } from "generated/prisma/client";

export const getAllAvailability = async (): Promise<AvailabilityEntry[]> => {
    return prisma.availabilityEntry.findMany({
        orderBy: {
            date: "asc"
        }
    });
};

export const saveAvailability = async (
    date: Date,
    status: "available" | "unavailable"
): Promise<AvailabilityEntry> => {
    const existing = await prisma.availabilityEntry.findFirst({
        where: { date }
    });

    if (existing) {
        return prisma.availabilityEntry.update({
            where: { id: existing.id },
            data: { status }
        });
    }

    return prisma.availabilityEntry.create({
        data: { date, status }
    });
};

export const deleteAvailabilityByDate = async (date: Date): Promise<AvailabilityEntry | null> => {
    const existing = await prisma.availabilityEntry.findFirst({
        where: { date }
    });

    if (!existing) {
        return null;
    }

    return prisma.availabilityEntry.delete({
        where: { id: existing.id }
    });
};