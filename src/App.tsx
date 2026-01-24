import "./App.css";
import {Routes, Route} from "react-router-dom";
import Header from './components/layout/header/Header'
import CreateEvent from "./components/create-event/CreateEvent";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Footer from "./components/layout/footer/Footer";
import Landing from "./components/landing/Landing";

export default function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/calendar" element={<CalendarComponent />}></Route>
        <Route path="/create-event" element={<CreateEvent />}></Route>
      </Routes>
      <Footer />
    </main>
  );
}
