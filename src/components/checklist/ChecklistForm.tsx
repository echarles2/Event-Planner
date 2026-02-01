import { useState, type FormEvent } from "react";

function ChecklistForm({ addTodo }: { addTodo: (item: string) => void }) {
    const [itemInput, setItemInput] = useState("");
    const [error, setError] = useState("");
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (itemInput.trim().length === 0) {
            setError("Please add an item");
            return;
        }

        addTodo(itemInput);
        setItemInput("")
        setError("");
    }

    return (
        <div className="checklist-form">
            <h2>
                Checklist: 
            </h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={itemInput}
                    onChange={(e) => setItemInput(e.target.value)}
                    placeholder="Add an item"
                />
                <button type="submit" className="todo-btn">Add</button>
                <p className="error-message">{error}</p>
            </form>
        </div>
    )
}

export default ChecklistForm;