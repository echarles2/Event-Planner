import "./Landing.css";

function Landing(){
    return(
        <section className="landing">
            <h2>Welcome!</h2>
            <div className="description">
                <p><strong>what's the move?</strong> is an event management application where you can create events, send invites, and view your friends' avalibilities through shared calendars.</p>
                <p>Get started now by choosing a page from the navigation bar above!</p>
            </div>
        </section>
    );
}

export default Landing;