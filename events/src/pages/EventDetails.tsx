import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button   } from '@mui/material';
import {EventEditForm} from '../components/EventEditForm'; 
import {ConfirmDialog} from '../components/ConfirmDialog';

  
interface Ticket {
  _id?: string;
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

interface EventDetails {
  _id?: string;
  name: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

const EventDetails: React.FC = () => {
  const eventId = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<EventDetails>(`http://localhost:3500/api/event/${eventId.id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        // Optionally, handle error state here
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!event) {
    return <Typography variant="h5">Event not found</Typography>;
  }
  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveEvent = async (editedEvent: EventDetails) => {
    try {
      await axios.put(`http://localhost:3500/api/event/${editedEvent._id}`, editedEvent);
      setEvent(editedEvent); // Update local state with the edited event
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:3500/api/event/${eventId._id}`);
      navigate('/events'); // Redirect to the events listing page after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      // Optionally, handle error state here
    }
  };

  const handleOpenConfirmDialog = () => setConfirmOpen(true);
  const handleCloseConfirmDialog = () => setConfirmOpen(false);

  const handleDeleteEventConfirmed = async () => {
    handleCloseConfirmDialog();
    // Place your existing handleDeleteEvent logic here
    handleDeleteEvent();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>{event.name}</Typography>
      <Typography variant="h5" gutterBottom>Date: {new Date(event.date).toLocaleDateString('en-CA')}</Typography>
      <Typography variant="body1" gutterBottom>Description: {event.description}</Typography>
      
      <Typography variant="h6" gutterBottom>Tickets:</Typography>
      {event.tickets.length > 0 ? (
        event.tickets.map((ticket, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="subtitle1">Name: {ticket.name.toLocaleUpperCase()}</Typography>
            <Typography variant="subtitle2">Type: {ticket.type.toLocaleUpperCase()}</Typography>
            <Typography variant="subtitle2">Price: ${ticket.price}</Typography>
            <Typography variant="subtitle2">Booking Fee: ${ticket.bookingFee}</Typography>
            <Typography variant="subtitle2">Availability: {ticket.availability.toLocaleUpperCase()}</Typography>
          </div>
        ))
      ) : (
        <Typography>No tickets available.</Typography>
      )}
      <Button variant="outlined" onClick={handleOpenEditDialog}>
        Edit Event
      </Button>
      <Button variant="outlined" color="error" onClick={handleOpenConfirmDialog} sx={{ ml: 2 }}>
        Delete Event
      </Button>
      <ConfirmDialog open={confirmOpen} onClose={handleCloseConfirmDialog} onConfirm={handleDeleteEventConfirmed} />

      {event && (
        <EventEditForm
          event={event}
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEvent}
        />
      )}
  </Container>
    
  );
};

export default EventDetails;
