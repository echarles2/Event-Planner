/**
 * I.3 Architecture Usage:
 * - useFormInput(): manages the Day field's value and validation message.
 * - AvailabilityService: validates the submitted day/status.
 * - AvailabilityRepository: provides CRUD-style persistence using test data.
 *
 */
import "./calendar-component.css";
import React, {useEffect, useMemo, useState} from "react";
import { useCounter } from "../../state/CounterContext";
import type { AvailabilityEntry, AvailabilityStatus } from "../../types/availability";
import { AvailabilityRepository } from "../../apis/availabilityRepo";
import { useFormInput } from "../../hooks/useFormHook";
import { AvailabilityService } from "../services/availabilityService";

export default function CalendarComponent() {
  const { counter, increment } = useCounter();

  const repo = useMemo(() => new AvailabilityRepository(), []);
  const service = useMemo(() => new AvailabilityService(repo), [repo]);
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);
  const dayInput = useFormInput();

  useEffect(() => {
    async function load() {
      const data = await repo.getAll();
      setAvailability(data);
    }
    load();
  }, [repo]);

  async function handleSave(day: number, status: AvailabilityStatus) {
    const result = await service.saveDayStatus(day, status);

    if (!result.success) {
      dayInput.setError(result.error ?? "Invalid input.");
      return;
    }

    dayInput.setError("");
    setAvailability(await repo.getAll());
  }

  async function handleRemove(day: number) {
    await service.removeDay(day);
    setAvailability(await repo.getAll());
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus | "">("");
  

  const availabilityByDay = useMemo(() => {
    const lookup: Record<number, AvailabilityStatus> = {};
    for (const entry of availability) {
      lookup[entry.day] = entry.status;
    }
    return lookup;
  }, [availability]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dayNum = Number(dayInput.value);

    await handleSave(dayNum, selectedStatus as AvailabilityStatus);
  }

  function removeAvailability(day: number) {
    handleRemove(day);
  }

  return (
    <section className="calendar-component">
      <header>
        <h2>January</h2>
        <form className="availability-form" onSubmit={handleSubmit}>
          <label>
            Day:
            <select
              value={dayInput.value}
              onChange={dayInput.onChange}
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
              onChange={(e) =>setSelectedStatus(e.target.value as AvailabilityStatus | "")}
              >
              <option value="">Select...</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <button type="submit">Add/Update</button>

          {dayInput.error && <p className="form-error">{dayInput.error}</p>}
        </form>
        <div className="availability-list">
          <h3>Your availability list</h3>
          {availability.length === 0 ? (
            <p>No availability set yet.</p>
          ) : (
            <ul>
              {availability
                .slice()
                .sort((a, b) => a.day - b.day)
                .map((entry) => (
                  <li key={entry.id}>
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
        <div className="shared-counter">
          <span>Shared Counter: {counter}</span>
          <button type="button" onClick={increment}>
            Increment
          </button>
        </div>
    </section>

  );
}