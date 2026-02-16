import type { Event } from "../components/create-event/CreateEvent";
import { eventTestData } from "./eventData";

export function fetchEvents(): Event[]{
    return eventTestData;
}

export function getEventById(eventId: number): Event{
    const foundEvent = eventTestData.find(e => e.id === eventId);

    if(!foundEvent) {
        throw new Error("Failed to fetch event with ${eventId}");
    }

    return foundEvent;
}

export async function createEvent(event: Omit<Event, "id">): Promise<Event>{
    const createdEvent: Event = {
        ...event,
        id: Date.now()
    };
    eventTestData.push(createdEvent);
    return createdEvent;
}