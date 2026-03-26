import type { Event } from "../../../../shared/types/events";

type EventsResponseJSON = {message: string, data: Event[]};
type EventResponseJSON = {message: string, data: Event};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const EVENT_ENDPOINT = "/create-event"

export async function fetchEvents(): Promise<Event[]> {
    const eventResponse: Response = await fetch(
        `${BASE_URL}${EVENT_ENDPOINT}`
    );

    if(!eventResponse.ok) {
        throw new Error("Failed to fetch events.");
    }

    const json: EventsResponseJSON = await eventResponse.json();
    return json.data;
}

export async function createEvent(event: Event) {
    const eventResponse: Response = await fetch(
        `${BASE_URL}${EVENT_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    if(!eventResponse.ok) {
        throw new Error("Failed to create event.");
    }

    const json: EventResponseJSON = await eventResponse.json();
    return json.data;
}