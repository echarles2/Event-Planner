import "./calendar-component.css";

export default function CalendarComponent() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const eventsByDay: Record<number, string[]> = {
  5: ["Birthday"],
  12: ["Meeting"],
  20: ["Deadline"],
  };

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <section className="calendar-component">
      <header>
        <h2>January</h2>
      </header>

      <table>
        <thead>
          <tr>
            {weekDays.map((d) => (
              <th key={d} scope="col">{d}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((week, i) => (
            <tr key={i}>
              {week.map((day) => (
                <td key={day}>
                  <button type="button">
                    <span className="day-number">{day}</span>
                      {eventsByDay[day] && (
                        <ul className="day-events">
                        {eventsByDay[day].map((event, index) => (
                          <li key={index}>{event}</li>
                        ))}
                      </ul>
                     )}

                    </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}