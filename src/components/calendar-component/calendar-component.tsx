import "./calendar-component.css";

type CalendarProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function CalendarComponent(props: CalendarProps) {
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

  function increment() {
    props.setCounter((prev) => prev + 1);
  }

  return (
    <section className="calendar-component">
      <header>
        <h2>January</h2>
        <div className="shared-counter">
          <span>Shared Counter: {props.counter}</span>
          <button type="button" onClick={increment}>
            Increment
          </button>
        </div>
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