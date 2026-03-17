import type { Checklist, ChecklistItem } from "../../../../../../shared/types/checklist";

const checklists: Checklist[] = [];
const checklistItems: ChecklistItem[] = [];

// temporary ID generator since there's no prisma yet
const generateId = () => Math.random().toString(36);

/**
 * Retrieves all checklists from storage
 * @returns Array of all checklists
 */
export const getAllChecklists = async (): Promise<Checklist[]> => {
    return checklists;
};

/**
 * Creates a new checklist, associated with an event (optional)
 * @param checklistData - Object containing optional eventId
 * @returns - The newly created Checklist object
 */
export const createChecklist = async (checklistData: {
    eventId?: string;
}): Promise<Checklist> => {
    // create a new checklist group
    const newChecklist: Checklist = {
        id: generateId(),
        eventId: checklistData.eventId,
        items: []
    };

    checklists.push(newChecklist);

    return newChecklist;
};

/**
 * Creates a new checklist item and adds it to both the global items array 
 * & its parent checklist group
 * @param checklistItemData - Object containing checklistId and item (task)
 * @returns - The newly created ChecklistItem object
 * @throws Error if the parent checklist is not found
 */
export const createChecklistItem = async (checklistItemData: {
    checklistId: string;
    item: string;
}): Promise<ChecklistItem> => {
    const checklist = checklists.find(c => c.id === checklistItemData.checklistId);
    if (!checklist) {
        throw new Error("Checklist not found!");
    }

    // create a new checklist item
    const newChecklistItem: ChecklistItem = {
        id: generateId(),
        checklistId:  checklistItemData.checklistId,
        item: checklistItemData.item,
        completed: false
    };

    checklistItems.push(newChecklistItem);
    // also push into checklist group (since interface includes items[])
    checklist.items.push(newChecklistItem);

    return newChecklistItem;
}

/**
 * Updates the checklist item to either complete/incomplete status
 * @param id - the ID of the item to be updated
 * @returns - the updated item
 * @throws - error if the checklist item is not found
 */
export const updateChecklistItem = async (
    id: string
): Promise<ChecklistItem> => {
    const item = checklistItems.find(i => i.id === id);

    if (!item) throw new Error("Checklist Item not found!");
    item.completed = !item.completed;

    return item;
};

/**
 * Delete the Checklist group
 * @param id - the ID of the checklist to be deleted
 */
export const deleteChecklist = async (id: string): Promise<void> => {
    const index: number = checklists.findIndex(c => c.id === id);

    if (index === -1) {
        throw new Error(`Checklist with ID ${id} not found`);
    }

    checklists.splice(index, 1);
}

/**
 * Delete the Checklist item
 * @param id - the ID of the checklist item to be deleted
 */
export const deleteChecklistItem = async (id: string): Promise<void> => {
    const index: number = checklistItems.findIndex(item => item.id === id);

    if (index === -1) {
        throw new Error(`Checklist Item with ID ${id} not found`);
    }

    const item = checklistItems[index];
    // remove from the checklist.items[] too
    const checklist = checklists.find(c => c.id === item.checklistId);
    if (checklist) {
        checklist.items = checklist.items.filter(i => i.id !== id);
    }

    checklistItems.splice(index, 1);
}