
import type {Event} from "../../../../../../shared/types/events.js";
import prisma from "../../../../prisma/client.js";

export async function fetchAllEvents(): Promise<Event[]>{
    const events = await prisma.event.findMany();
    return events.map (e => ({
        id: e.id,
        name: e.name,
        date: e.date.toISOString(),
        location: e.location ?? undefined,
        details: e.details ? JSON.parse(e.details) : []
    }));
}

export async function createEvent(event: Omit<Event, "id">): Promise<Event>{
    if (event.name.trim().length < 3){
        throw new Error("Name must be at least 3 letters.");
    }

    if (event.name && event.name.length > 30){
        throw new Error("Name must be less than 30 characters.");
    }

    const dateInput = new Date(event.date);
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    if (dateInput < dateToday){
        throw new Error("Date cannot be in the past.");
    }

    if (event.location && event.location.length > 50){
        throw new Error("Location must be less than 50 characters.");
    }

    const newEvent = await prisma.event.create({
        data: {
            name: event.name,
            date: new Date(event.date),
            location: event.location,
            details: JSON.stringify(event.details)
        }
    });

    return{
        id: newEvent.id,
        name: newEvent.name,
        date: newEvent.date.toISOString(),
        location: newEvent.location ?? undefined,
        details: newEvent.details ? JSON.parse(newEvent.details) : []
    };
}