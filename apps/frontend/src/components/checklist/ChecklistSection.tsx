import type { FormEvent } from "react";
import { useFormInput } from "../../hooks/useFormHook";
import { checklistItemValidation } from "../services/checklistService";
import type { ChecklistItem } from "../../../../../shared/types/checklist";
import Todo from "./Todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

//Props for the ChecklistSection component
interface ChecklistSectionProps {
    eventName: string;
    items: ChecklistItem[];
    onAddItem: (item: string) => void;
    onToggleItem: (id: string) => void;
    onDeleteItem: (id: string) => void;
    onDeleteChecklist: () => void;
}

/**
 * Renders a checklist section for an event or personal list.
 * Uses the useFormInput hook to manage the user input state & error messages.
 * Uses the checklistItemValidation service to validate the to-do item input.
 * @param props - eventName: Title of the checklist section (Event Name / Personal)
 * @param props - items: To-do items to show
 * @param props - onAddItem: Callback invoked with the new to-do item input
 * @param props - onToggleItem - Callback invoked with an item id to toggle completion.
 * @param props - onDeleteItem - Callback invoked with an item id to delete it.
 * @param props - onDeleteChecklist - Callback invoked to delete the entire checklist.
 * @returns - the rendered  checklist section.
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
