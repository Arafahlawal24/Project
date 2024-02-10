import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Event} from "../components/Interfaces/Event"



const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/events');
        console.log(response.data)
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error
      }
    };

    fetchEvents();
  }, []);

  const columns: TableColumn<Event>[] = [
    { name: 'Event Name', cell: row => <Link to={`/event/${row._id}`}>{row.name}</Link>, sortable: true },
    { name: 'Date', selector: event => new Date(event.date).toLocaleDateString('en-CA'), sortable: true },
    { name: 'Description', selector: event => event.description },
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
              minHeight: '45px',
            },
          },
          headCells: {
            style: {
              fontSize: '25px',
              fontWeight: 'bold',
            },
          },
          cells: {
            style: {
              fontSize: '20px',
            },
          },
        }}
      />
    </Container>
  );
};

export default EventList;
