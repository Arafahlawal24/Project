import Event from '../models/Event';
import Ticket from '../models/Ticket';


const createEvent = async (req, res) => {
  const { name, date, description, tickets } = req.body;

  try {
    const existingEvent = await Event.findOne({ name, date });
    if (existingEvent) {
      return res.status(400).json({ message: 'Event already exists with this name and date.' });
    }

    // First, create the event without tickets
    const event = new Event({ name, date, description });
    const savedEvent = await event.save();

    // Then, create tickets and associate them with the created event
    const ticketIds = await Promise.all(tickets.map(async (ticketData) => {
      const ticket = new Ticket({ ...ticketData, event: savedEvent._id });
      const savedTicket = await ticket.save();
      return savedTicket._id;
    }));

    // Finally, update the event with ticket IDs
    savedEvent.tickets = ticketIds;
    await savedEvent.save();

    res.status(201).json({ message: "Event and Tickets saved successfully", event: savedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('tickets');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById  = async (req, res) => {
  try {
    console.log(req.params)
    const event = await Event.findById(req.params.id).populate('tickets');
    if (!event) {
      return res.status(404).json({ message: 'Event not found!!' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { name, date } = req.body;
  try {
    const duplicateEvent = await Event.findOne({ name, date, _id: { $ne: req.params.id } });
    if (duplicateEvent) {
      return res.status(400).json({ message: 'Another event exists with this name and date.' });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
