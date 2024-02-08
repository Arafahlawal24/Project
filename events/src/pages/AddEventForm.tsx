import React, { useState, ChangeEvent } from 'react';
import { Container, TextField, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface Ticket {
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

interface EventFormValues {
  eventName: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

const initialTicket: Ticket = {
  name: '',
  type: 'adult',
  price: 0,
  bookingFee: 0,
  availability: 'available',
};

interface FormErrors {
  eventName?: string;
  tickets?: { 
    name?: string;
  }[];
}


export const AddEventForm: React.FC = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formValues, setFormValues] = useState<EventFormValues>({
    eventName: '',
    date: '',
    description: '',
    tickets: [initialTicket],
  });

const handleEventChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};

const handleTicketChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const updatedTickets = [...formValues.tickets];
  updatedTickets[index] = {
    ...updatedTickets[index],
    [e.target.name]: e.target.name === 'price' || e.target.name === 'bookingFee' ? parseFloat(e.target.value) : e.target.value,
  };
  setFormValues({ ...formValues, tickets: updatedTickets });
};

const addTicket = () => {
  setFormValues({ ...formValues, tickets: [...formValues.tickets, initialTicket] });
};

const removeTicket = (index: number) => {
  const updatedTickets = [...formValues.tickets];
  updatedTickets.splice(index, 1);
  setFormValues({ ...formValues, tickets: updatedTickets });
};

const validateForm = (): boolean => {
  const errors: FormErrors = {};
  if (!formValues.eventName.trim()) {
    errors.eventName = "Event name is required.";
  }
  // more validation checks later

  // validation for the first ticket's name
  if (formValues.tickets.length > 0 && !formValues.tickets[0].name.trim()) {
    if (!errors.tickets) errors.tickets = [];
    errors.tickets[0] = { ...errors.tickets[0], name: "Ticket name is required." };
  }
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const isFormValid = validateForm();

  if (isFormValid) {
    // Submit the form data
    console.log("Submitting", formValues);
    // dispatch(addEvent(formValues)); // Redux action dispatch, assuming you have set this up
    // Or send directly to your backend
    // axios.post('/api/events', formValues).then(response => { ... });
  } else {
    console.log("Validation errors", formErrors);
  }
};


  return (
    <Container maxWidth="md">
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" gutterBottom>
        Add New Event
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Event Name"
            fullWidth
            variant="outlined"
            name="eventName"
            value={formValues.eventName}
            onChange={handleEventChange}
            error={!!formErrors.eventName}
            helperText={formErrors.eventName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Event Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="date"
            value={formValues.date}
            onChange={handleEventChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            name="description"
            value={formValues.description}
            onChange={handleEventChange}
          />
        </Grid>
        {formValues.tickets.map((ticket, index) => (
        <React.Fragment key={index}>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Ticket Name"
                fullWidth
                variant="outlined"
                name="name"
                value={ticket.name}
                onChange={(e) => handleTicketChange(index, e)}
                error={!!(formErrors.tickets && formErrors.tickets[index]?.name)}
                helperText={formErrors.tickets && formErrors.tickets[index]?.name}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                name="type"
                value={ticket.type}
                onChange={(e) => handleTicketChange(index, e as ChangeEvent<HTMLInputElement>)}
                label="Type"
                >
                <MenuItem value="adult">Adult</MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="child">Child</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Price"
                fullWidth
                variant="outlined"
                name="price"
                type="number"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, e)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Booking Fee"
                fullWidth
                variant="outlined"
                name="bookingFee"
                type="number"
                value={ticket.bookingFee}
                onChange={(e) => handleTicketChange(index, e)}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                name="availability"
                value={ticket.availability}
                onChange={(e) => handleTicketChange(index, e as ChangeEvent<HTMLInputElement>)}
                label="Availability"
                >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold out">Sold Out</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={12}>
            <Button onClick={() => removeTicket(index)} variant="contained" color="error">
                Remove Ticket
            </Button>
            </Grid>
        </React.Fragment>
        ))}
        <Grid item xs={12}>
        <Button onClick={addTicket} variant="contained" color="primary">
            Add Ticket
        </Button>
        </Grid>
        <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
            Submit Event
        </Button>
        </Grid>
      </Grid>
      </form>
    </Container>
  );
};
