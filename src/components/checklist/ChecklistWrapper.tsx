/* Parent component for the Checklist page */
import { useState } from 'react';
import { ChecklistForm } from './ChecklistForm';
import { ChecklistSection } from './ChecklistSection';
import type { Checklist } from "../../types/resources";
import { groupChecklistsByEvent } from "../services/checklistService";
import * as EventsRepo from "../../apis/createEventRepo";
import './Checklist.css';
import { v4 as uuidv4 } from 'uuid';

function ChecklistWrapper() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const events = EventsRepo.fetchEvents();

    // Group checklists by event using the service
    const grouped = groupChecklistsByEvent(checklists);

    // Resolves an event name from its eventId (or "Personal")
    function getEventName(key: string): string {
        if (key === "personal") return "Personal";
        const event = events.find(e => String(e.id) === key);
        return event ? event.name : `Event ${key}`;
    }

    // Create a new checklist
    function handleAddChecklist(eventId: string | undefined, item: string) {
        const newItem: Checklist = {
            id: uuidv4(),
            eventId,
            item,
            completed: false,
        };
        setChecklists(prev => [...prev, newItem]);
    }

    // Add an item to an existing checklist group
    function handleAddItem(groupKey: string, item: string) {
        const eventId = groupKey === "personal" ? undefined : groupKey;
        const newItem: Checklist = {
            id: uuidv4(),
            eventId,
            item,
            completed: false,
        };
        setChecklists(prev => [...prev, newItem]);
    }

    // Toggle an item's completed status
    function handleToggleItem(id: string) {
        setChecklists(prev =>
            prev.map(c => (c.id === id ? { ...c, completed: !c.completed } : c))
        );
    }

    // Delete a single item
    function handleDeleteItem(id: string) {
        setChecklists(prev => prev.filter(c => c.id !== id));
    }

    // Delete an entire checklist group (all items for that group will be deleted)
    function handleDeleteChecklist(groupKey: string) {
        setChecklists(prev =>
            prev.filter(c => (c.eventId ?? "personal") !== groupKey)
        );
    }

    return (
        <div className="checklist-wrapper">
            <ChecklistForm
                checklists={checklists}
                onAddChecklist={handleAddChecklist}
            />

            {Array.from(grouped.entries()).map(([key, items]) => (
                <ChecklistSection
                    key={key}
                    eventName={getEventName(key)}
                    items={items}
                    onAddItem={(item) => handleAddItem(key, item)}
                    onToggleItem={handleToggleItem}
                    onDeleteItem={handleDeleteItem}
                    onDeleteChecklist={() => handleDeleteChecklist(key)}
                />
            ))}
        </div>
    );
}

export default ChecklistWrapper;