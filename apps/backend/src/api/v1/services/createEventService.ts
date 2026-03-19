import type {Event} from "../../../../../../shared/types/events";

let events: Event[] = [];

export function fetchAllEvents(): Event[]{
    return events;
}

export function createEvent(event: Event): Event{
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

    events.push(event);

    return event;
}