import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }
  ]
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
