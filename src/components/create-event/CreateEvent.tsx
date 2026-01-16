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

function CreateEvent(){
    return(
        <section className="create-event">
            <h2>Create Your Event!</h2>

            {eventExamples.map((gathering) => (
                <div key={gathering.id}>
                    <p>{gathering.name}</p>
                    <p>Date: {gathering.date}</p>
                    <p>Time: {gathering.time}</p>
                    <p>Location: {gathering.location}</p>
                    <p>Details: {gathering.details}</p>
                </div>
            ))}
        </section>
    );
}

export default CreateEvent;