import type { FormEvent } from "react";
import { useFormInput } from "../../hooks/useFormHook";
import { 
    checklistItemValidation, 
    checklistEventValidation 
} from "../services/checklistService";
import type { Checklist } from "../../../../../shared/types/resources";
import type { Event } from "../../../../../shared/types/events";
import * as EventsRepo from "../../apis/createEventRepo";

// Props for the ChecklistForm component
interface ChecklistFormProps {
    checklists: Checklist[];
    onAddChecklist: (eventId: string | undefined, item: string) => void;
}
/**
 * Renders a Checklist form to enable event selection & add to-do items.
 * Uses "checklistItemValidation" service to validate the to-do item input. 
 * Uses "checklistEventValidation" service to validate the selected event before calling "onAddChecklist".
 * @param props- checklists: Existing checklist items used to filter available events.
 * @param props - onAddChecklist: Callback function called with eventId & item when the form is submitted successfully.
 * @returns - The rendered checklist form.
 */
export function ChecklistForm({
    checklists,
    onAddChecklist,
}: ChecklistFormProps) {
    const itemInput = useFormInput();
    const eventIdInput = useFormInput();
    const eventsPromise = EventsRepo.fetchEvents();
    let events: Event[] = [];
    eventsPromise.then(res => {events = res;});

    /**
     * Filters out events that already have a checklist
     * usedEventIds collects all eventId that already appear in the Checklists[] 
     * and creates a new set out of that.
     * 
     * availableEvents filters the entire event list to only show the events NOT 
     * in that set (aka, events w/ no designated checklist yet)
     * 
     * hasPersonalChecklist checks if a Personal (no eventID) checklist exist already
     * then will hide the "Personal" option from the dropdown if yes.
     */
    const usedEventIds = new Set(
        checklists.filter(c => c.eventId).map(c => c.eventId)
    );
    const availableEvents = events.filter(e => !usedEventIds.has(String(e.id)));
    const hasPersonalChecklist = checklists.some(c => !c.eventId);
 
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // use the checklistItemValidation service for item validation
        const itemValidation = checklistItemValidation(itemInput.value);
        if (!itemValidation.isValid) {
            itemInput.setError(itemValidation.errors[0]);
            return;
        }
        
        // use the checklistEventValidation service for event assignment
        const eventValidation = checklistEventValidation(
            eventIdInput.value || undefined,
            checklists
        );
        if (!eventValidation.isValid) {
            itemInput.setError(eventValidation.errors[0]);
            return;
        }

        // Only submit successfully if validations passed
        onAddChecklist(
            eventIdInput.value || undefined,
            itemInput.value
        );

        // Clear form using hook
        itemInput.setValue("");
        eventIdInput.setValue("");
    }

    return (
        <div className="checklist-form">
            <form onSubmit={handleSubmit}>
                <label>Event:</label>
                <select 
                    value={eventIdInput.value}
                    onChange={eventIdInput.onChange}>
                        {!hasPersonalChecklist && (
                            <option value="">Personal</option>
                        )}
                        {hasPersonalChecklist && (
                            <option value="" disabled>Select an event</option>
                        )}

                        {availableEvents.map(event => (
                            <option key={event.id} 
                            value={event.id}>{event.name}</option> 
                        ))}
                    </select>

                <input 
                    type="text"
                    value={itemInput.value}
                    onChange={itemInput.onChange}
                    placeholder="Add an item"
                />
                {itemInput.error && (
                    <p className="error-message">{itemInput.error}</p>
                )}
                <button type="submit" className="todo-btn">Add</button>
            </form>
        </div>
    )
}