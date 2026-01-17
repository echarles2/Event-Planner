import "./App.css";
import Header from './components/header/Header'
import CalendarComponent from "./components/calendar-component/calendar-component";
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
