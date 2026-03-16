import { NavLink } from "react-router-dom";
import "./Header.css"

function Header() {
    return(
        <section className="header">
            <header>
                <NavLink to="/" end>     
                    <h1>📅what's the move?</h1>
                </NavLink>
                <nav>
                    <div className="page-links">
                        <NavLink to="/" end>
                            Home
                        </NavLink>

                        <NavLink to="/create-event">
                            Create Event
                        </NavLink>

                        <NavLink to="/my-checklist">
                            My Checklist
                        </NavLink>

                        <NavLink to="/calendar">
                            My Events
                        </NavLink>
                    </div>
                </nav>
            </header>
        </section>
    )
}

export default Header;
