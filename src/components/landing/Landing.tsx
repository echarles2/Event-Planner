import "./Landing.css";

type LandingProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

function Landing(props: LandingProps) {

  function increment() {
    props.setCounter((prev) => prev + 1);
  }

    return(
        <section className="landing">
            <h2>make moves, not excuses</h2>
            <div className="description">
                <p><strong>what's the move?</strong> is an event management application where you can create events, 
                send invites, make a checklist, and view your friends' avalibilities through shared calendars.</p>
                <p>Get started now by choosing a page from the navigation bar above!</p>
            </div>
            <p>Shared counter: {props.counter}</p>
            <button type="button" onClick={increment}>Increment</button>
        </section>
    );
}

export default Landing;