import React from "react";
import "./App.css";
import Header from './components/header/Header'
import CalendarComponent from "./components/calendar-component/CalendarComponent";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <main>
      <Header />
      <CalendarComponent />
      <Footer />
    </main>
  );
}
