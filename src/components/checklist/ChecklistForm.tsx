import { useState, type FormEvent } from "react";

function ChecklistForm({ addTodo }: { addTodo: (item: string) => void }) {
    const [itemInput, setItemInput] = useState("");
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        addTodo(itemInput);
        setItemInput("")
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
            </form>
            

        </div>

    )
}

export default ChecklistForm;