import { Routes, Route } from 'react-router-dom';
import EventsList from './pages/EventsList'
import EventDetails from './pages/EventDetails';
import AddEventForm from './pages/AddEventForm';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<AddEventForm />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
  );
}