import { Routes, Route } from 'react-router-dom';
import EventsList from './pages/EventsList'
import EventDetails from './pages/EventDetails';
import Home from './pages/Home';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/events" element={<EventsList />} /> */}
        <Route path="/events" element={<EventDetails />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
  );
}