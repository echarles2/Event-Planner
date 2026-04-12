import { NavLink } from "react-router-dom";
import "./Header.css"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

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

                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </nav>
            </header>
        </section>
    )
}

export default Header;
