/**
 * Interface for the Checklist (group) structure
 */
export interface Checklist {
    id: string;
    eventId?: string; 
    items: ChecklistItem[];
}

/**
 * Interface for the Checklist Item structure
 */
export interface ChecklistItem {
    id: string;
    checklistId: string;
    item: string;
    completed: boolean;
}