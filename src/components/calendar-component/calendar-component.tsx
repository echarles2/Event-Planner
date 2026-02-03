import "./calendar-component.css";
import React, {useMemo, useState} from "react";

type AvailabilityStatus = "available" | "unavailable";

type AvailabilityEntry = {
  day: number;
  status: AvailabilityStatus;
};

type CalendarProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;

  availability: AvailabilityEntry[];
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityEntry[]>>;
};

export default function CalendarComponent(props: CalendarProps) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  function increment() {
    props.setCounter((prev) => prev + 1);
  }

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus | "">("");
  const [error, setError] = useState<string>("");

  const availabilityByDay = useMemo(() => {
    const lookup: Record<number, AvailabilityStatus> = {};
    for (const entry of props.availability) {
      lookup[entry.day] = entry.status;
    }
    return lookup;
  }, [props.availability]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dayNum = Number(selectedDay);
    if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
      setError("Please enter a valid day number between 1 and 31.");
      return;
    }

    if (selectedStatus !== "available" && selectedStatus !== "unavailable") {
      setError("Please choose Available or Unavailable.");
      return;
    }

    setError("");

    props.setAvailability((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.day === dayNum);
      if (existingIndex !== -1) {
        const copy = [...prev];
        copy[existingIndex] = { day: dayNum, status: selectedStatus };
        return copy;
      }

      return [...prev, { day: dayNum, status: selectedStatus }];
    });
  }

  function removeAvailability(dayToRemove: number) {
    props.setAvailability((prev) => prev.filter((entry) => entry.day !== dayToRemove));
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

        <form className="availability-form" onSubmit={handleSubmit}>
          <label>
            Day:
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Select...</option>
              {days.map((d) => (
                <option key={d} value={String(d)}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status:
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as AvailabilityStatus | "")}
            >
              <option value="">Select...</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <button type="submit">Add/Update</button>

          {error && <p className="form-error">{error}</p>}
        </form>
        <div className="availability-list">
          <h3>Your availability list</h3>
          {props.availability.length === 0 ? (
            <p>No availability set yet.</p>
          ) : (
            <ul>
              {props.availability
                .slice()
                .sort((a, b) => a.day - b.day)
                .map((entry) => (
                  <li key={entry.day}>
                    Day {entry.day}: {entry.status}
                    <button
                      type="button"
                      onClick={() => removeAvailability(entry.day)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </header>

      <table>
        <thead>
          <tr>
            {weekDays.map((d) => (
              <th key={d} scope="col">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((week, i) => (
            <tr key={i}>
              {week.map((day) => {
                const status = availabilityByDay[day];

                return (
                  <td key={day}>
                    <button type="button">
                      <span className="day-number">{day}</span>

                      {status && (
                        <div className="day-tag">
                          <span>{status}</span>
                          <button
                            type="button"
                            onClick={() => removeAvailability(day)}
                          >
                            x
                          </button>
                        </div>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}