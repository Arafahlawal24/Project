// src/components/Navigation.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Events Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Add Event
        </Button>
        <Button color="inherit" component={Link} to="/events">
          View Events
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
