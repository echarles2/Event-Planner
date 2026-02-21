import type { FormEvent } from "react";
import { useFormInput } from "../../hooks/useFormHook";
import { checklistItemValidation } from "../services/checklistService";
import type { Checklist } from "../../types/resources";
import Todo from "./Todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

/**
 * Interface for the checklist group, toggle & delete Checklist & Item props
 */
interface ChecklistSectionProps {
    eventName: string;
    items: Checklist[];
    onAddItem: (item: string) => void;
    onToggleItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
    onDeleteChecklist: () => void;
}

/**
 * A dedicated section to render the checklist groupings (Event or Personal).
 * Uses the useFormInput hook and checklistItemValidation service.
 */
export function ChecklistSection({
    eventName,
    items,
    onAddItem,
    onToggleItem,
    onDeleteItem,
    onDeleteChecklist,
}: ChecklistSectionProps) {
    const itemInput = useFormInput();

    function handleAddItem(e: FormEvent) {
        e.preventDefault();

        // Reuse the same validation service as ChecklistForm
        const validation = checklistItemValidation(itemInput.value);
        if (!validation.isValid) {
            itemInput.setError(validation.errors[0]);
            return;
        }

        onAddItem(itemInput.value);
        itemInput.setValue("");
    }

    return (
        <div className="checklist-section">
            <div className="checklist-section-header">
                <h3>{eventName}</h3>
                <button
                    className="delete-checklist-btn"
                    onClick={onDeleteChecklist}
                >
                    <FontAwesomeIcon icon={faXmark} /> 
                </button>
            </div>

            {items.map(item => (
                <Todo
                    key={item.id}
                    task={{ id: item.id, task: item.item, completed: item.completed }}
                    toggleComplete={onToggleItem}
                    deleteTodo={onDeleteItem}
                />
            ))}

            <form onSubmit={handleAddItem} className="checklist-section-form">
                <input
                    type="text"
                    value={itemInput.value}
                    onChange={itemInput.onChange}
                    placeholder="Add another item..."
                />
                <button type="submit" className="todo-btn">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </form>
            {itemInput.error && (
                <p className="error-message">{itemInput.error}</p>
            )}
        </div>
    );
}
