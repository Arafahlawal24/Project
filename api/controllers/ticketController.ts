import Event from '../models/Event';
import Ticket from '../models/Ticket';

const createTicket = async (req, res) => {
  const { eventId, name, type } = req.body;
  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    // Check for duplicate tickets
    const existingTicket = await Ticket.findOne({ event: eventId, name, type });
    if (existingTicket) {
      return res.status(400).json({ message: 'A ticket with the same name and type already exists for this event.' });
    }
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    
    // Optionally, update the event's tickets array
    event.tickets.push(savedTicket._id);
    await event.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const tickets = await Ticket.find({ event: eventId });
    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found for this event.' });
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { eventId, name, type } = req.body;
  try {
    // Check for duplicate tickets
    const duplicateTicket = await Ticket.findOne({ event: eventId, name, type, _id: { $ne: req.params.id } });
    if (duplicateTicket) {
      return res.status(400).json({ message: 'Another ticket with the same name and type exists for this event.' });
    }
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    // Optionally, remove the ticket ID from the event's tickets array
    await Event.findByIdAndUpdate(ticket.event, { $pull: { tickets: ticket._id } });

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTicket, getTicketsForEvent, updateTicket, deleteTicket };
