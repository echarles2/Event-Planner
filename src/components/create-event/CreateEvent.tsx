import "../../index.css";
import "./CreateEvent.css";
import { useState } from "react";

interface Event{
    name: string;
    date?: string;
    location?: string;
    details?: string[];
}

interface CreateEventProps{
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    onCreateEvent?: (event: Event) => void;
}

function CreateEvent(props: CreateEventProps){
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [detailInput, setDetailInput] = useState('');
    const [details, setDetails] = useState<string[]>([]);
    const [error, setError] = useState('');

    function increment() {
      props.setCounter((prev) => prev + 1);
    }
  
    function deleteDetail(index: number){
            setDetails(details.filter((_, i) => i !==index));
    }
    
    function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if (name.trim().length < 3){
            setError("Event name must be at least 3 letters.");
            return;
        }
        if (name.trim().length > 30){
            setError("Event name must be less than 30 characters.");
            return;
        }
        if (date && isNaN(Date.parse(date))){
            setError("Enter a valid date.");
            return;
        }
        if (date){
            const dateInput = new Date(date);
            const dateToday = new Date();
            dateToday.setHours(0, 0, 0, 0);
            if (dateInput < dateToday){
                setError("Date cannot be in the past.");
                return;
            }
        }
        if (location.trim().length > 50){
            setError("Location must be less than 50 characters.");
            return;
        }

        const createdEvent: Event = {
            name: name,
            date: date || undefined,
            location: location || undefined,
            details: details
        };

        onCreateEvent?.(createdEvent);

        setName("");
        setDate("");
        setLocation("");
        setDetails([]);
        setDetailInput("");
        setError("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Create Your Event!</h2>
            <label>
                <strong>Event Name:</strong><br></br>
                <input value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                <strong>Date:</strong><br></br>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <label>
                <strong>Location:</strong><br></br>
                <input value={location} onChange={e => setLocation(e.target.value)} />
            </label>
            
            <label>
                <strong>Event Details:</strong><br></br>
                <input value={detailInput} onChange={e => setDetailInput(e.target.value)} />
            </label>

            <button className="add-detail-button" type="button" onClick={() => {
                if (detailInput.trim() === ""){
                    return;
                }
                setDetails([...details, detailInput]);
                setDetailInput("");
                }}
                >Add Detail
            </button>

            <ul>
                {details.map((detail, index) => (
                    <li key={index}>{detail}<button className="delete-detail-button" type="button" onClick={() => 
                        deleteDetail(index)}>
                        Delete
                        </button>
                    </li>
                ))}
            </ul>

            <br></br><p className="error-message">{error}</p>
        
            <div className="shared-counter">
                    <span>Shared Counter: {props.counter}</span>
                    <button type="button" onClick={increment}>
                        Increment
                    </button>
            </div>

            <button className="create-event-button" type="submit">Create Event</button><br></br>
        </form>
    );
}

export default CreateEvent;
