import type { Checklist, ChecklistItem } from "../../../../shared/types/checklist";

type ChecklistsResponseJSON = {message: string, data: Checklist[]};
type ChecklistResponseJSON = {message: string, data: Checklist};
type ChecklistItemResponseJSON = {message: string, data: ChecklistItem};

// Base url for backend
const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

/**
 * Get all Checklists
 * @returns - All Checklist data
 */
export async function fetchChecklists(
    token?: string|null
): Promise<Checklist[]> {
    const response: Response = await fetch(
        `${API_BASE}/checklists`,
        token? {
            headers: {
                Authorization: `Bearer ${token}`,
            } 
        } : undefined
    );

    if (!response.ok) {
        throw new Error("Failed to fetch Checklists")
    }
    
    const json: ChecklistsResponseJSON = await response.json();
    return json.data;
}

/**
 * Create a checklist
 * @param eventId - (Optional) event ID to attach the checklist to
 * @returns - The newly created checklist
 * @throws - Error if the checklist can't be created
 */
export async function createChecklist(
    token?: string|null,
    eventId?: string
): Promise<Checklist> {
    const response: Response = await fetch(`${API_BASE}/checklists`, 
    {
        method: "POST",
        body: JSON.stringify({ eventId }),
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error("Failed to create new Checklist group");
    }

    const json: ChecklistResponseJSON = await response.json();
    return json.data;
}

/**
 * Delete a Checklist
 * @param id - The ID of the checklist to be removed
 * @throws - Error if the checklist can't be deleted
 */
export async function deleteChecklist(
    id: string,
    token?: string|null,
): Promise<void> {
    const response: Response = await fetch(`${API_BASE}/checklists/${id}`, 
        {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`
        }
    });

        if(!response.ok) {
            throw new Error(`Failed to delete checklist with ${id}`);
        }
    }

/**
 * Create a checklist item
 * @param checklistId - The ID of the checklist to add the item to
 * @param item - New task item for the checklist
 * @returns - The newly added checklist item
 * @throws - Error if the item can't be created
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
 * Update an existing checklist item (toggle on/off completion)
 * @param id - Checklist item ID to update
 * @returns - The updated checklist item
 * @throws - Error if the checklist item can't be updated
 */
export async function updateChecklistItem(
    id: string
): Promise<ChecklistItem> {
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
 * Delete a single checklist item
 * @param id - the ID of the checklist item to delete
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