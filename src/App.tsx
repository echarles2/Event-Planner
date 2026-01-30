import "./App.css";
import {Routes, Route} from "react-router-dom";
import CreateEvent from "./components/create-event/CreateEvent";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Landing from "./components/landing/Landing";
import { Layout } from "./components/layout/Layout";
import { useState } from "react";

export default function App() {
  var [counter, setCounter] = useState(0);
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/create-event" element={<CreateEvent counter={counter} setCounter={setCounter} onCreateEvent={_event => console.log("Event created.")}/>}></Route>
          <Route index element={<Landing counter={counter} setCounter={setCounter} />}></Route>
          <Route path="/calendar" element={<CalendarComponent counter={counter} setCounter={setCounter} />}></Route>
        </Route>
      </Routes>
    </main>
  );
}
