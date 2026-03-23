/**
 * Create Event Component
 * 
 * This component uses the useFormInput hook which handles the state, validation, and error messages.
 * The addEvent service function validates user input and calls the createEvent repository to store event data.
 * This structure helps separate logic from the create event component, making it easier to update and maintain code.
 */

import "../../index.css";
import "./CreateEvent.css";
import { useState } from "react";
import { useFormInput } from "../../hooks/useFormHook";
import { createNewEvent } from "../services/createEventService";
import { useCounter } from "../../state/CounterContext";
import type { Event } from "../../../../../shared/types/events";

interface CreateEventProps{
    onCreateEvent?: (event: Event) => void;
}

function CreateEvent({onCreateEvent}: CreateEventProps){
    const { counter, increment } = useCounter();
    const name = useFormInput();
    const date = useFormInput();
    const location = useFormInput();
    const detailInput = useFormInput();
    const [details, setDetails] = useState<string[]>([]);
    const [formError, setFormError] = useState<string>("");
  
    function deleteDetail(index: number){
            setDetails(details.filter((_, i) => i !==index));
    }
    
    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        name.setError("");
        date.setError("");
        location.setError("");
        setFormError("");

        const validName = name.validate(value =>
            value.trim().length < 3 ? "Event name must be at least 3 letters." :
            value.trim().length > 30 ? "Event name must be less than 30 characters." : null
        );

        const validDate = date.validate(value =>
            !value || isNaN(Date.parse(value)) ? "Please enter a valid date." : null
        );

        if (!validName || ! validDate){
            return;
        }

        const createdEvent = await createNewEvent({
            id: Date.now().toString(),
            name: name.value,
            date: date.value,
            location: location.value || undefined,
            details
        });

        if (!createdEvent.success){
            setFormError(createdEvent.error || "Error has occurred.");
            return;
        }

        onCreateEvent?.({
            id: Date.now().toString(),
            name: name.value,
            date: date.value,
            location: location.value || undefined,
            details
        });

        name.setValue("");
        date.setValue("");
        location.setValue("");
        detailInput.setValue("");
        setDetails([]);

        alert(`${name.value} has been successfully created!`);
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="create-event-form">
                <h2>Create Your Event!</h2>
                <label>
                    <strong>Event Name:</strong><br></br>
                    <input value={name.value} onChange={name.onChange} />
                    {name.error && <p className="error-message">{name.error}</p>}
                </label>
                <label>
                    <strong>Date:</strong><br></br>
                    <input type="date" value={date.value} onChange={date.onChange} />
                    {date.error && <p className="error-message">{date.error}</p>}
                </label>
                <label>
                    <strong>Location:</strong><br></br>
                    <input value={location.value} onChange={location.onChange} />
                </label>
                
                <label>
                    <strong>Event Details:</strong><br></br>
                    <input value={detailInput.value} onChange={detailInput.onChange} />
                </label>

                <button className="add-detail-button" type="button" onClick={() => {
                    if (detailInput.value.trim() === ""){
                        return;
                    }
                    setDetails([...details, detailInput.value]);
                    detailInput.setValue("");
                    }}
                    >Add Detail
                </button>

                <ul className="detail-list">
                    {details.map((detail, index) => (
                        <li key={index} className="detail-item"><span className="detail-content">{detail}</span><button className="delete-detail-button" type="button" onClick={() => 
                            deleteDetail(index)}>
                            Delete
                            </button>
                        </li>
                    ))}
                </ul>

                <br></br>{formError && <p className="error-message">{formError}</p>}

                <button className="create-event-button" type="submit">Create Event</button><br></br>
            </div>

            <div className="shared-counter">
                <span>Shared Counter: {counter}</span>
                <button type="button" onClick={increment}>
                Increment
                </button>
            </div>
        </form>
    );
}

export default CreateEvent;
