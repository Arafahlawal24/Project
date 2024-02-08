import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

interface Ticket {
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

interface Event {
  eventName: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error
      }
    };

    fetchEvents();
  }, []);

  const columns: TableColumn<Event>[] = [
    { name: 'Event Name', selector: event => event.eventName, sortable: true },
    { name: 'Date', selector: event => event.date, sortable: true },
    { name: 'Description', selector: event => event.description, sortable: true },
    // Add more columns as needed
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Event List
      </Typography>
      <DataTable
        columns={columns}
        data={events}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={{
          rows: {
            style: {
              minHeight: '72px',
            },
          },
          headCells: {
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          cells: {
            style: {
              fontSize: '14px',
            },
          },
        }}
      />
    </Container>
  );
};

export default EventList;
