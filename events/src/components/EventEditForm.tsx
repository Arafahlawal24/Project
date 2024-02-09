import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from '@mui/material';

interface Ticket {
  _id?: string;
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

interface Event {
  _id?: string;
  name: string;
  date: string;
  description: string;
  tickets: Ticket[];
}


interface EventEditFormProps {
  event: Event; 
  open: boolean;
  onClose: () => void;
  onSave: (event: Event) => Promise<void>;

}

export const EventEditForm: React.FC<EventEditFormProps> = ({ event, open, onClose, onSave }) => {
  const [editedEvent, setEditedEvent] = useState<Event>(event);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(editedEvent);
    onClose();
  };

  const handleTicketChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Ticket
    ) => {
    const updatedTickets = [...editedEvent.tickets];
    const updatedTicket = { ...updatedTickets[index], [field]: e.target.value };
    updatedTickets[index] = updatedTicket;
    setEditedEvent({ ...editedEvent, tickets: updatedTickets });
    };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Event Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={editedEvent.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          variant="outlined"
          name="date"
          value={editedEvent.date.split('T')[0]} 
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={editedEvent.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        {editedEvent.tickets.map((ticket, index) => (
        <div key={index}>
            <TextField
            label="Ticket Name"
            variant="outlined"
            name="name"
            value={ticket.name}
            onChange={(e) => handleTicketChange(index, e, 'name')}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Ticket Type"
            variant="outlined"
            select
            name="type"
            value={ticket.type}
            onChange={(e) => handleTicketChange(index, e, 'type')}
            fullWidth
            margin="normal"
            >
            {['adult', 'family', 'child'].map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
            </TextField>
            <TextField
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={ticket.price}
            onChange={(e) => handleTicketChange(index, e, 'price')}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Booking Fee"
            variant="outlined"
            type="number"
            name="bookingFee"
            value={ticket.bookingFee}
            onChange={(e) => handleTicketChange(index, e, 'bookingFee')}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Availability"
            variant="outlined"
            select
            name="availability"
            value={ticket.availability}
            onChange={(e) => handleTicketChange(index, e, 'availability')}
            fullWidth
            margin="normal"
            >
            {['available', 'sold out'].map((availability) => (
                <MenuItem key={availability} value={availability}>{availability}</MenuItem>
            ))}
            </TextField>
        </div>
        ))}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
