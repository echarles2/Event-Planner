import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Todo({task, toggleComplete, deleteTodo}) {
    return (
        <div className='Todo'>
            <p onClick={() => toggleComplete(task.id)} 
                className={`${task.completed ? 'completed' : ""}`}>
                {task.task}
            </p>
            <div>
                <FontAwesomeIcon icon={faXmark} 
                onClick={() => deleteTodo(task.id)}
                style={{color: "#efd287"}} 
                />
            </div>
        </div>
    )
}
export default Todo;