import "./App.css";
import Header from './components/header/Header'
import CreateEvent from "./components/create-event/CreateEvent";
import CalendarComponent from "./components/calendar-component/calendar-component";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <main>
      <Header />
      <CreateEvent />
      <CalendarComponent />
      <Footer />
    </main>
  );
}
