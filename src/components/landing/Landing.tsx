import { useCounter } from "../../state/CounterContext";
import "./Landing.css";


function Landing() {
const { counter, increment } = useCounter();

    return(
        <section className="landing">
            <h2>Welcome!</h2>
            <div className="description">
                <p><strong>what's the move?</strong> is an event management application where you can create events, send invites, and view your friends' avalibilities through shared calendars.</p>
                <p>Get started now by choosing a page from the navigation bar above!</p>
            </div>
            <p>Get started managing events by choosing a page from the navigation bar.</p>

            <div className="shared-counter">
                <span>Shared Counter: {counter}</span>
                <button type="button" onClick={increment}>
                Increment
                </button>
            </div>
        </section>
    );
}

export default Landing;