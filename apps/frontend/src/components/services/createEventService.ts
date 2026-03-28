import * as eventRepo from "../../apis/createEventRepo";
import type { Event } from "../../../../../shared/types/events";

export interface Status{
    error?: string;
    success: boolean;
}

export async function createNewEvent(event: Omit<Event, "id">)
: Promise<{success:true; data: Event} | {success: false; error: string}>{
    if (event.name.trim().length < 3){
        return{
            error: "Event name must be at least 3 letters.",
            success: false
        }
    }

    const createdEvent = await eventRepo.createEvent(event);
    return{
        success: true,
        data: createdEvent
    }
}