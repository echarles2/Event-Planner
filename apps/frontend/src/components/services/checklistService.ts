import * as ChecklistRepo from "../../apis/checklistRepo";
import type { Checklist } from "../../../../../shared/types/checklist";

/**
 * Request to get all Checklist from the repository
 * @returns - Checklists array
 */
export function fetchChecklist() {
    const checklist = ChecklistRepo.fetchChecklists();
    return checklist;
}

/**
 * Ensures that there's no duplicate Event/Personal checklist group
 * @param eventId - The Event that is attached to the checklist 
 * @param existingChecklists - Checks if a checklist already exists for that event
 * @returns - whether it's valid or not (boolean) & its error message
 */
export function checklistEventValidation(
    eventId: string | undefined,
    existingChecklists: Checklist[]
): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    // Allow only 1 checklist per event and only 1 personal checklist
    if (eventId) {
        const duplicateChecklist = existingChecklists.some(
            c => c.eventId === eventId
        );

        if (duplicateChecklist) {
            isValid = false;
            errors.push("A checklist for this event already exists")
        }
    } else {
        const hasPersonal = existingChecklists.some(c => !c.eventId);
        if (hasPersonal) {
            isValid = false;
            errors.push("A personal checklist already exists");
        }
    }

    return { isValid, errors };
}

/**
 * Groups an array of checklist items by their eventId.
 * Items with no eventId are grouped as "personal".
 * This will be reusable across components that need to display checklists by event.
 * @param checklists - An array of checklist items
 * @returns - a map where keys are eventId (or "personal") and values are arrays of to-do items
 */
export function groupChecklistsByEvent(
    checklists: Checklist[]
): Map<string, Checklist[]> {
    const groups = new Map<string, Checklist[]>();

    for (const item of checklists) {
        const key = item.eventId ?? "personal";
        const existing = groups.get(key) || [];
        existing.push(item);
        groups.set(key, existing);
    }

    return groups;
}

/**
 * Validation for the addition of to-do items
 * @param item - a to-do item to be added in a checklist
 * @returns - whether it's valid or not (boolean) & its error message
 */
export function checklistItemValidation(
    item: string
): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    // Item cannot be empty
    if (!item.trim()) {
        isValid = false;
        errors.push("Please add an item")
    }

    // Enforce an item length limit
    if (item.trim().length > 30) {
        isValid = false;
        errors.push("Item must be 30 characters or less")
    }

    return { isValid, errors };
}

/**
 * Determines whether a checklist is complete (all to-do items have been ticked-off)
 * Can be reused as aprogress indicator in Events & Checklist components
 * @param items - An array; each element must be an object that is marked as "completed"
 * @returns - boolean: whether a checklist is complete/incomplete
 */
export function isChecklistComplete(
    items: { completed: boolean }[]
): boolean {
    return items.length > 0 && items.every(i => i.completed);
}