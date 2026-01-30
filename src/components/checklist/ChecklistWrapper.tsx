/* Parent component for the Checklist Form */

import { useState } from 'react';
import ChecklistForm from './ChecklistForm';
import Todo from './Todo';
import './Checklist.css'
import { v4 as uuidv4 } from 'uuid';
uuidv4();

type TodoItem = { 
    id: string;
    task: string;
    completed: boolean;
}

function ChecklistWrapper() {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    const addTodo = (todo: string) => {
        if (todo.trim() !== '') {
            setTodos([...todos, { id: uuidv4(), task: todo, completed: false}])
        }
    }

    const toggleComplete = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    return (
        <div className='checklist-wrapper'>
            < ChecklistForm addTodo={addTodo} />
            { todos.map((todo, index) => (
                < Todo task={todo} key={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                />
            ))}
        </div>
    )
}

export default ChecklistWrapper;