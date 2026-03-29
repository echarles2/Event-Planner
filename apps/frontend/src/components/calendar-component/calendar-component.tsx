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
import type { AvailabilityEntry, AvailabilityStatus } from "../../../../../shared/types/availability";
import { AvailabilityRepository } from "../../apis/availabilityRepo";
import { useFormInput } from "../../hooks/useFormHook";
import { AvailabilityService } from "../services/availabilityService";
import { Calendar } from "primereact/calendar";

export default function CalendarComponent() {
  const { counter, increment } = useCounter();

  const repo = useMemo(() => new AvailabilityRepository(), []);
  const service = useMemo(() => new AvailabilityService(repo), [repo]);
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);
  const dayInput = useFormInput();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());

  useEffect(() => {
    async function load() {
      const data = await repo.getAll();
      setAvailability(data);
    }
    load();
  }, [repo]);

  async function handleSave(date: string, status: AvailabilityStatus) {
    const result = await service.saveDayStatus(date, status);

    if (!result.success) {
      dayInput.setError(result.error ?? "Invalid input.");
      return;
    }

    dayInput.setError("");
    setAvailability(await repo.getAll());
    setSelectedStatus("");
  }

  async function handleRemove(date: string) {
    await service.removeDay(date);
    setAvailability(await repo.getAll());
  }

  const currentMonthLabel = visibleMonth.toLocaleString("en-CA", {
    month: "long",
    year: "numeric"
  });

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  ).getDay();

  const calendarCells = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const rows: (number | null)[][] = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(calendarCells.slice(i, i + 7));
  }

  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus | "">("");
  

  const availabilityByDate = useMemo(() => {
    const lookup: Record<string, AvailabilityStatus> = {};
    for (const entry of availability) {
      const normalizedDate = entry.date.slice(0, 10);
      lookup[normalizedDate] = entry.status;
    }
    return lookup;
  }, [availability]);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!selectedDate) {
    dayInput.setError("Please select a date.");
    return;
  }

  if (!selectedStatus) {
    dayInput.setError("Please select a status.");
    return;
  }

  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");
  const selectedDateString = `${year}-${month}-${day}`;

  await handleSave(selectedDateString, selectedStatus);
}

  function removeAvailability(date: string) {
    handleRemove(date);
  }

  
  return (
    <section className="calendar-component">
      <header>
        <h2>{currentMonthLabel}</h2>
        <form className="availability-form" onSubmit={handleSubmit}>
          <label htmlFor="availability-date">Date:</label>
          <Calendar
            inputId="availability-date"
            value={selectedDate}
            onChange={(e) => {
              const nextDate = e.value as Date | null;
              setSelectedDate(nextDate);
              if (nextDate) {
                setVisibleMonth(nextDate);
              }
            }}
            showIcon
            dateFormat="dd/mm/yy"
          />

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
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((entry) => (
                  <li key={entry.id}>
                    {entry.date.slice(0, 10)}: {entry.status}
                    <button
                      type="button"
                      onClick={() => removeAvailability(entry.date.slice(0, 10))}
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
              {week.map((day, index) => {
                if (day === null) {
                  return <td key={`empty-${i}-${index}`}></td>;
                }

                const cellDate = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const status = availabilityByDate[cellDate];

                return (
                  <td key={day}>
                    <button
                        type="button"
                        onClick={() =>
                          setSelectedDate(
                            new Date(
                              visibleMonth.getFullYear(),
                              visibleMonth.getMonth(),
                              day
                            )
                          )
                        }
                      >
                      <span className="day-number">{day}</span>

                      {status && (
                        <div className="day-tag">
                          <span>{status}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAvailability(cellDate);
                              }}
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