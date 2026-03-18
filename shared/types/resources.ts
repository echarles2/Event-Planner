/**
 * Interface for the Checklist structure
 */
export interface Checklist {
    id: string;
    eventId?: string; 
    item: string;
    completed: boolean;
}