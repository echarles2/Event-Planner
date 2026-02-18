import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

/**
 * Interface for the task, toggleComplete, and deleteTodo props
 */
interface TodoProps {
    task: { id: string; task: string; completed: boolean };
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
}

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