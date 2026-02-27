import type { Checklist } from "../types/resources";
import { testChecklistData } from "./checklistData";

// In-memory data to simulate an external resource & allow mutation
let checklistStore: Checklist[]= [...testChecklistData];

/**
 * Get all Checklist items
 * @returns - The entire Checklist Data
 */
export function fetchChecklists(): Checklist[] {
    return checklistStore;
}

/**
 * Get a checklist by ID
 * @param checklistId - The ID of the checklist to be retrieved
 * @returns the checklist item corresponding to the checklist ID
 */
export function getChecklistById(checklistId: string): Checklist {
    const foundChecklist = checklistStore.find(c => c.id === checklistId);

    if (!foundChecklist) {
        throw new Error(`Failed to fetch checklist with ${checklistId}`)
    }
    return foundChecklist;
}

/**
 * Create a new checklist item
 * @param item - New checklist to be added
 */
export function createChecklist(item: Checklist): void {
    checklistStore.push(item);
}

/**
 * Update an existing checklist item
 *  @param checklistId - The to-be updated checklist item
 * @param updatedItem - The object containing the fields to be updated (partially)
 */
export function updateChecklist(
    checklistId: string,
    updatedItem: Partial<Checklist>): void {
    checklistStore = checklistStore.map(item => 
        item.id === checklistId ? { ...item, ...updatedItem } : item
    );
}

/**
 * Delete a Checklist by ID
 * @param checklistId - The ID of the checklist to be removed
 */
export function deleteChecklist(checklistId: string): void {
    const foundChecklist = checklistStore.find(c => c.id === checklistId);

    if (!foundChecklist) {
        throw new Error(`Failed to delete checklist with ${checklistId}`)
    }

    checklistStore = checklistStore.filter(c => c.id !== checklistId);
}