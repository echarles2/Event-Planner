import type { Checklist, ChecklistItem } from "../../../../shared/types/checklist";

type ChecklistsResponseJSON = {message: string, data: Checklist[]};
type ChecklistResponseJSON = {message: string, data: Checklist};
type ChecklistItemResponseJSON = {message: string, data: ChecklistItem};

// Base url for backend
const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

/**
 * GET all checklists
 * @returns - All checklist data
 */
export async function fetchChecklists(): Promise<Checklist[]> {
    const response: Response = await fetch(`${API_BASE}/checklists`);

    if (!response.ok) {
        throw new Error("Failed to fetch Checklists")
    }
    
    const json: ChecklistsResponseJSON = await response.json();
    return json.data;
}

/**
 * CREATE a checklist
 * @param eventId - (Optional) event ID to attach the checklist to
 * @returns - The newly created checklist
 * @throws - Error if the checklist can't be created
 */
export async function createChecklist(
    eventId?: string
): Promise<Checklist> {
    const response: Response = await fetch(`${API_BASE}/checklists`, 
    {
        method: "POST",
        body: JSON.stringify({ eventId }),
        headers: { "Content-Type": "application/json" }
    });

    if(!response.ok) {
        throw new Error("Failed to create new Checklist group");
    }

    const json: ChecklistResponseJSON = await response.json();
    return json.data;
}

/**
 * DELETE a Checklist 
 * @param id - the ID of the checklist to delete
 * @throws - Error if the checklist can't be deleted
 */
export async function deleteChecklist(id: string): Promise<void> {
    const response: Response = await fetch(`${API_BASE}/checklists/${id}`, 
    {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error(`Failed to delete checklist with ${id}`);
    }
}

/**
 * CREATE a checklist item
 * @param checklistId - The ID of the checklist to add the item to
 * @param item - New task item for the checklist
 * @returns - The newly added checklist item
 * @throws - Error if the checklist item can't be created
 */
export async function createChecklistItem(
    checklistId: string,
    item: string
): Promise<ChecklistItem> {
    const response: Response = await fetch(`${API_BASE}/checklist-items`,
    {
        method: "POST",
        body: JSON.stringify({ checklistId, item }),
        headers: { "Content-Type": "application/json" }
    });

    if(!response.ok) {
        throw new Error("Failed to create new checklist task");
    }

    const json: ChecklistItemResponseJSON = await response.json();
    return json.data;
}

/**
 * UPDATE an existing checklist item (toggle on/off completion)
 * @param id - Checklist item ID to update
 * @returns - The updated checklist item
 * @throws - Error if the checklist item can't be updated
 */
export async function updateChecklistItem(id: string): Promise<ChecklistItem> {
    const response: Response = await fetch(`${API_BASE}/checklist-items/${id}`,
    {
        method: "PATCH",
    });

    if(!response.ok) {
        throw new Error("Failed to update checklist item");
    }

    const json: ChecklistItemResponseJSON = await response.json();
    return json.data;
}

/**
 * DELETE a single checklist item
 * @param id -  the ID of the checklist item to delete
 * @throws - Error if the checklist item can't be deleted
 */
export async function deleteChecklistItem(id: string): Promise<void> {
    const response: Response = await fetch(`${API_BASE}/checklist-items/${id}`, 
    {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error(`Failed to delete checklist item with ${id}`);
    }
}