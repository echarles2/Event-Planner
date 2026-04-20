import { useState, useEffect } from 'react';
import { ChecklistForm } from './ChecklistForm';
import { ChecklistSection } from './ChecklistSection';
import type { Checklist } from "../../../../../shared/types/checklist";
import type { Event } from '../../../../../shared/types/events';
import { groupChecklistsByEvent } from "../services/checklistService";
import * as EventsRepo from "../../apis/eventRepo";
import * as ChecklistRepo from "../../apis/checklistRepo";
import './Checklist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { useAuth, SignInButton } from "@clerk/clerk-react";

/**
 * Serves as the parent component for the Checklist feature, managing the 
 * checklist state and handling user interaction (add, toggle complete, delete).
 * It retrieves event data using Events Repository (fetchEvents) and organizes 
 * checklist items using groupChecklistsByEvent service. 
 * This refactored component makes use of the layered architecture by coordinating
 * repository, service, and component-level logic.
 */
function ChecklistWrapper() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isSignedIn) return;

        async function loadChecklists() {
            try {
                const token = await getToken();
                const data = await ChecklistRepo.fetchChecklists(token);
                setChecklists(data);
            } catch (error) {
                console.error("Failed to fetch Checklists", error)
            }
        }
        loadChecklists();
    }, [getToken, isSignedIn]);

    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        if (!isSignedIn) return;

        async function loadEvents() {
            try {
                const data = await EventsRepo.fetchEvents();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        }
        loadEvents();
    }, [isSignedIn]);

    // Group checklists by event using the service
    const grouped = groupChecklistsByEvent(checklists);

    // Resolves an event name from its eventId (or "Personal")
    function getEventName(key: string): string {
        if (key === "personal") return "Personal";
        const event = events.find(e => String(e.id) === key);
        return event ? event.name : `Event ${key}`;
    }

    // Helper to refresh checklist after adding new task
    async function refreshChecklists() {
        const token = await getToken();
        const updated = await ChecklistRepo.fetchChecklists(token);
        setChecklists(updated);
    }

    // Create a new checklist
    async function handleAddChecklist(eventId: string | undefined, item: string) {
        try {
            const token = await getToken();
            const exisitngChecklist = checklists.find(c => c.eventId === eventId);
            let checklistId: string;

            if (!exisitngChecklist) {
                const newChecklist = await ChecklistRepo.createChecklist(token, eventId);
                checklistId = newChecklist.id;
            } else {
                checklistId = exisitngChecklist.id;
            }

            await ChecklistRepo.createChecklistItem(checklistId, item, token);
            await refreshChecklists();
        } catch (error) {
            console.error("Failed to create new Checklist", error);
        }
    };

    // Add an item to an existing checklist group
    async function handleAddItem(
        checklistId: string,
        item: string
    ) {
        try {
            const token = await getToken();
            await ChecklistRepo.createChecklistItem(checklistId, item, token);
            await refreshChecklists();
        } catch (error) {
            console.error("Failed to create new checklist item", error);
        }
    };

    // Toggle an item's completed status
    async function handleToggleItem(id: string) {
        try {
            const token = await getToken();
            await ChecklistRepo.updateChecklistItem(id, token);
            await refreshChecklists();
        } catch (error) {
            console.error("Failed to update checklist item", error);
        }
    };

    // Delete a single item
    async function handleDeleteItem(id: string) {
        try {
            const token = await getToken();
            await ChecklistRepo.deleteChecklistItem(id, token);
            await refreshChecklists();
        } catch (error) {
            console.error("Failed to delete checklist item", error);
        }
    };

    // Removes all to-do items for that Event/Personal (to wipe that entire checklist section)
    async function handleDeleteChecklist(id: string) {
        try {
            const token = await getToken();
            await ChecklistRepo.deleteChecklist(id, token);
            await refreshChecklists();
        } catch (error) {
            console.error("Failed to delete checklist", error);
        }
    };

    if(!isSignedIn) {
        return (
            <div className='checklist-wrapper'>
                <h2>
                    <FontAwesomeIcon icon={faClipboardList} />
                    Checklist
                </h2>
                <p>Please log in to use checklist</p>
                <SignInButton />
            </div>
        )
    }

    // Turns the grouped data (event name & its to-do items) into rendable structure
    const entries = Array.from(grouped.entries());
   
    return (
        <div className="checklist-wrapper">
                <h2>
                    <FontAwesomeIcon icon={faClipboardList} />
                    Checklist
                </h2>
            <ChecklistForm
                checklists={checklists}
                events={events}
                onAddChecklist={handleAddChecklist}
            />
            
            {entries.map(([eventKey, value]) => {
                const { checklistId, items } = value;

                return (
                    <ChecklistSection
                        key={eventKey}
                        eventName={getEventName(eventKey)}
                        items={items}
                        onAddItem={(item) => handleAddItem(checklistId, item)}
                        onToggleItem={handleToggleItem}
                        onDeleteItem={handleDeleteItem}
                        onDeleteChecklist={() => handleDeleteChecklist(checklistId)}
                    />
                )
            })}
        </div>
    );
}

export default ChecklistWrapper;