import React from "react";
import "./App.css";
import CalendarComponent from "./components/calendar-component/CalendarComponent";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <main>
      <CalendarComponent />
      <Footer />
    </main>
  );
}
