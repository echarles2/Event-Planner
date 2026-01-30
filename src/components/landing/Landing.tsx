import "./Landing.css";
import ChecklistWrapper from "../checklist/ChecklistWrapper";

function Landing(){
    return(
        <section className="landing">
            <h2>Welcome!</h2>
            <p>Get started managing events by choosing a page from the navigation bar.</p>
            < ChecklistWrapper />
        </section>
    );
}

export default Landing;