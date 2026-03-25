import { useState } from 'react';
import { ChecklistForm } from './ChecklistForm';
import { ChecklistSection } from './ChecklistSection';
import type { Checklist } from "../../../../../shared/types/resources";
import type { Event } from '../../../../../shared/types/events';
import { groupChecklistsByEvent } from "../services/checklistService";
import * as EventsRepo from "../../apis/createEventRepo";
import './Checklist.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { useCounter } from "../../state/CounterContext";

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
    let events: Event[] = [];
    EventsRepo.fetchEvents().then(res => {events =res;}) 
    const { counter, increment } = useCounter();

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

    // Removes all to-do items for that Event/Personal (to wipe that entire checklist section)
    function handleDeleteChecklist(eventKey: string) {
        setChecklists(prev =>
            prev.filter(item => eventKey === "personal" 
                ? item.eventId : item.eventId !== eventKey
            )
                //(item.eventId ?? "personal") !== eventKey)
        );
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
                onAddChecklist={handleAddChecklist}
            />
            
            {entries.map(entry => {
                const eventKey = entry[0];
                const items = entry[1];

                return (
                    <ChecklistSection
                        key={eventKey}
                        eventName={getEventName(eventKey)}
                        items={items}
                        onAddItem={(item) => handleAddItem(eventKey, item)}
                        onToggleItem={handleToggleItem}
                        onDeleteItem={handleDeleteItem}
                        onDeleteChecklist={() => handleDeleteChecklist(eventKey)}
                    />
                )
            })}
            <div className="shared-counter">
                <span>Shared Counter: {counter}</span>
                <button type="button" onClick={increment}>Increment</button>
            </div>
        </div>
    );
}

export default ChecklistWrapper;