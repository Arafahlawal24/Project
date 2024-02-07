import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['adult', 'family', 'child'] },
  price: { type: Number, required: true },
  bookingFee: { type: Number, required: true },
  availability: { type: String, required: true, enum: ['available', 'sold out'] }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;