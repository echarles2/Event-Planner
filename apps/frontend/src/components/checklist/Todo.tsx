import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// Props for the To-do component
interface TodoProps {
    task: { id: string; task: string; completed: boolean };
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
}

/**
 * Renders an individual to-do item with controls to toggle completed state & deletion.
 * Clicking the to-do text toggles its completed state and the X icon deletes it.
 * @param props - Todo Component props
 * @returns - the individual to-do item 
 */
function Todo({ task, toggleComplete, deleteTodo }: TodoProps) {
    return (
        <div className='Todo'>
            <p onClick={() => toggleComplete(task.id)} 
                className={`${task.completed ? 'completed' : ""}`}>
                {task.task}
            </p>
            <div className="delete-checklist-btn">
                <FontAwesomeIcon icon={faXmark} 
                onClick={() => deleteTodo(task.id)}
                />
            </div>
        </div>
    )
}
export default Todo;