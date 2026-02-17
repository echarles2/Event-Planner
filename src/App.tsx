import "./App.css";
import {Routes, Route} from "react-router-dom";
import CreateEvent from "./components/create-event/CreateEvent";
import ChecklistWrapper from "./components/checklist/ChecklistWrapper";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Landing from "./components/landing/Landing";
import { Layout } from "./components/layout/Layout";
import { CounterProvider } from "./state/CounterContext";
import React, { useState } from "react";

type AvailabilityStatus = "available" | "unavailable";

type AvailabilityEntry = {
  day: number;
  status: AvailabilityStatus;
};


export default function App() {
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);

  return (
    <main>
      <CounterProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />}></Route>
          <Route path="/create-event" element={<CreateEvent onCreateEvent={_event => console.log("Event created.")}/>}></Route>
          <Route path="/my-checklist" element={<ChecklistWrapper />}></Route>
          <Route path="/calendar" element={<CalendarComponent availability={availability} setAvailability={setAvailability} />}></Route>
        </Route>
      </Routes>
      </CounterProvider>
    </main>
  );
}
