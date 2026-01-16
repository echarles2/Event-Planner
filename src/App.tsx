import React from "react";
import CalendarComponent from "./components/calendar-component";

export default function App() {
  return React.createElement("main", null, React.createElement(CalendarComponent, null));
}