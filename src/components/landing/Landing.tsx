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
            <h2>Welcome!</h2>
            <p>Get started managing events by choosing a page from the navigation bar.</p>

            <p>Shared counter: {props.counter}</p>
            <button type="button" onClick={increment}>Increment</button>
        </section>
    );
}

export default Landing;