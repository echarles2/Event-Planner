import "./App.css";
import {Routes, Route} from "react-router-dom";
import CreateEvent from "./components/create-event/CreateEvent";
import ChecklistWrapper from "./components/checklist/ChecklistWrapper";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Landing from "./components/landing/Landing";
import { Layout } from "./components/layout/Layout";
import { useState } from "react";

type AvailabilityStatus = "available" | "unavailable";

type AvailabilityEntry = {
  day: number;
  status: AvailabilityStatus;
};


export default function App() {
  var [counter, setCounter] = useState(0);

  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing counter={counter} setCounter={setCounter} />}></Route>
          <Route path="/create-event" element={<CreateEvent counter={counter} setCounter={setCounter} onCreateEvent={_event => console.log("Event created.")}/>}></Route>
          <Route path="/my-checklist" element={<ChecklistWrapper />}></Route>
          <Route path="/calendar" element={<CalendarComponent counter={counter} setCounter={setCounter} availability={availability} setAvailability={setAvailability} />}></Route>
        </Route>
      </Routes>
    </main>
  );
}
