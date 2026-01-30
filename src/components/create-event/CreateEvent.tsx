import "../../index.css";
const eventExamples = [
    {
        id: 1, 
        name: "Jane's birthday", 
        date: "2026-01-01", 
        time: "12:00pm - 2:00pm", 
        location: "123 ABC Street", 
        details: "Please wear white and black"
    },
    {
        id: 2, 
        name: "Doe's Christmas Party", 
        date: "2026-12-24", 
        time: "5:00pm - 7:00pm", 
        location: "321 Winter Avenue", 
        details: "Bring a gift for the exchange!"
    }
];

type CreateEventProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

function CreateEvent(props: CreateEventProps) {

    function increment() {
    props.setCounter((prev) => prev + 1);
    }
    return(
        <section className="create-event">
            <h2>Create Your Event!</h2>
            <div className="shared-counter">
                    <span>Shared Counter: {props.counter}</span>
                    <button type="button" onClick={increment}>
                        Increment
                    </button>
                    </div>

            {eventExamples.map((gathering) => (
                <div key={gathering.id}>
                    <p><strong>{gathering.name}</strong></p>
                    <p><strong>Date:</strong> {gathering.date}</p>
                    <p><strong>Time:</strong> {gathering.time}</p>
                    <p><strong>Location:</strong> {gathering.location}</p>
                    <p><strong>Details:</strong> {gathering.details}</p>
                    <br/>
                </div>
            ))}
        </section>
    );
}

export default CreateEvent;