import type { Event } from "../../../../shared/types/events";

type EventsResponseJSON = {message: string, data: Event[]};
type EventResponseJSON = {message: string, data: Event};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const EVENT_ENDPOINT = "/event/latest"
const CREATE_EVENT_ENDPOINT = "/create-event"

export async function fetchEvents(token: string): Promise<Event[]> {
    const eventResponse: Response = await fetch(
        `${BASE_URL}${EVENT_ENDPOINT}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if(!eventResponse.ok) {
        throw new Error("Failed to fetch events.");
    }

    const json: EventsResponseJSON = await eventResponse.json();
    return json.data;
}

export async function createEvent(event: Omit<Event, "id">, token: string) {
    const eventResponse: Response = await fetch(
        `${BASE_URL}${CREATE_EVENT_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if(!eventResponse.ok) {
        throw new Error("Failed to create event.");
    }

    const json: EventResponseJSON = await eventResponse.json();
    return json.data;
}