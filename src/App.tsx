import "./App.css";
import {Routes, Route} from "react-router-dom";
import CreateEvent from "./components/create-event/CreateEvent";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Landing from "./components/landing/Landing";
import { Layout } from "./components/layout/Layout";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />}></Route>
          <Route path="calendar" element={<CalendarComponent />}></Route>
          <Route path="create-event" element={<CreateEvent />}></Route>
        </Route>
      </Routes>
    </main>
  );
}
