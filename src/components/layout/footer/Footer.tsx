import "./Footer.css";

const teamMembers = [
    "Ethan Charles",
    "Julia Dimayuga",
    "Lalaine Balmediano"
];

function Footer() {
    return(
        <section className="footer">
            <footer>
                <p>what's the move?</p>
                <p>
                    {teamMembers.map((member, index) => (
                        <span key={member}>
                            {member}
                            {index < teamMembers.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            </footer>
        </section>
    );
}

export default Footer;