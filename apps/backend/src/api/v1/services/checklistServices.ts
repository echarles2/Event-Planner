import prisma from "../../../../prisma/client.js";
import { Checklist, ChecklistItem } from "../../../../generated/prisma/client.js";

/**
 * Retrieves all checklists from storage
 * @returns Array of all checklists
 */
export const getAllChecklists = async (userId: string): Promise<Checklist[]> => {
    return prisma.checklist.findMany({
        where: { userId: userId },
        include: {
            items: true
        }
    });
};

/**
 * Creates a new checklist, associated with an event (optional)
 * @param checklistData - Object containing optional eventId
 * @returns - The newly created Checklist object
 */
export const createChecklist = async (userId: string, 
    checklistData: {
    eventId?: string;
}): Promise<Checklist> => {
    // create a new checklist group
    const newChecklist: Checklist = await prisma.checklist.create({
        data: {
            userId: userId,
            eventId: checklistData.eventId ?? null
        }
    });

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
    const checklist = await prisma.checklist.findUnique({
        where: { id: checklistItemData.checklistId },
    });
    
    if (!checklist) {
        throw new Error("Checklist not found!");
    }

    // create a new checklist item
    const newChecklistItem: ChecklistItem = await prisma.checklistItem.create({
        data: {
            checklistId: checklistItemData.checklistId,
            item: checklistItemData.item,
            completed: false,
        }
    })
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
    const item = await prisma.checklistItem.findUnique({ where: { id } });

    if (!item) throw new Error("Checklist Item not found!");

    const updatedItem = await prisma.checklistItem.update({
        where: { id },
        data: {
            completed: !item.completed
        }
    });

    return updatedItem;
};

/**
 * Delete the Checklist group
 * @param id - the ID of the checklist to be deleted
 */
export const deleteChecklist = async (
    userId: string, 
    id: string
): Promise<void> => {
    const checklist = await prisma.checklist.findUnique({ where: { id } });
    if (!checklist) throw new Error(`Checklist with ID ${id} not found`);

    await prisma.checklistItem.deleteMany({ 
        where: { 
            userId: userId,
            checklistId: id 
        } 
    });
    await prisma.checklist.delete({ where: { id } });
};

/**
 * Delete the Checklist item
 * @param id - the ID of the checklist item to be deleted
 */
export const deleteChecklistItem = async (id: string): Promise<void> => {
    const item = await prisma.checklistItem.findUnique({ where: { id } });
    if (!item) throw new Error(`Checklist Item with ID ${id} not found`);

    await prisma.checklistItem.delete({ where: { id } });
};