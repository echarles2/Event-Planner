import type { Event } from "../create-event/CreateEvent";
import { createEvent } from "../../apis/createEventRepo";

export interface Status{
    error?: string;
    success: boolean;
}

export function addEvent(event: Omit<Event, "id">){
    if (!event.name || event.name.trim().length < 3){
        return{
            error: "Event name must be at least 3 letters.",
            success: false
        };
    }

    if (event.name.trim().length > 30){
        return{
            error: "Event name must be less than 30 characters.",
            success: false
        };
    }

    if (!event.date || isNaN(Date.parse(event.date))){
        return{
            error: "Please enter a valid date.",
            success: false
        }
    }

    const dateInput = new Date(event.date);
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);
    if (dateInput < dateToday){
        return{
            error: "Date cannot be in the past.",
            success: false
        }
    }
    
    if (event.location && event.location.trim().length > 50){
        return{
            error: "Location must be less than 50 characters.",
            success: false
        }
    }

    createEvent(event);

    return{
        success: true
    };
}