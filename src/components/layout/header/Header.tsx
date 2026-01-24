import "./Header.css"

const navBarItems: string[] = [
    "Home",
    "Events",
    "Create Event"
];

function Header() {
    return(
        <section className="header">
            <header>
                <h1>what's the move</h1>
                <h3>make moves, not excuses</h3>
                <nav>
                    <ul> 
                    { navBarItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                    </ul>
                </nav>
            </header>
        </section>
    )
}

export default Header;