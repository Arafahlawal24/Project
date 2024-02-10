import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddEventForm from '../AddEventForm';

const mockStore = configureStore([]);
const store = mockStore({
  event: {
    events: [],
    status: 'idle',
    error: null
  }
});

describe('AddEventForm Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddEventForm />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByText(/Add New Event/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Ticket/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Event/i)).toBeInTheDocument();
  });
  it('validates inputs and shows errors', async () => {
  const user = userEvent.setup();
  const submitButton = screen.getByText(/Submit Event/i);
  await user.click(submitButton);


  expect(screen.getByText(/Event name is required./i)).toBeInTheDocument();
  expect(screen.getByText(/Event date is required./i)).toBeInTheDocument();
});
it('adds and removes ticket inputs', async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText(/Add Ticket/i));
  expect(screen.getAllByText(/Ticket Name/i).length).toBe(2);

  await user.click(screen.getAllByText(/Remove Ticket/i)[0]);
  expect(screen.getAllByText(/Ticket Name/i).length).toBe(1);
});
// Assuming `addEvent` is an async action creator that you dispatch on form submission
it('handles form submission and updates state via Redux', async () => {
  const user = userEvent.setup();
  // Mock the async action to resolve immediately for testing purposes
  jest.mock('../feature/eventSlice', () => ({
    addEvent: jest.fn().mockImplementation(() => async (dispatch) => {
      // Simulate successful event addition
      dispatch({ type: 'event/addEventSuccess', payload: {/* Mock event data */} });
    })
  }));

  // Fill in the form and submit
  await user.type(screen.getByLabelText(/Event Name/i), 'Test Event');
  await user.type(screen.getByLabelText(/Event Date/i), '2024-01-01');
  await user.type(screen.getByLabelText(/Description/i), 'This is a test event.');
  await user.click(screen.getByText(/Submit Event/i));

  // Check if the Redux action was dispatched
  expect(store.getActions()).toContainEqual(expect.objectContaining({ type: 'event/addEventSuccess' }));

  // Clean up mock to avoid affecting other tests
  jest.restoreAllMocks();
});

it('displays an error message when the event addition fails', () => {
  const store = mockStore({
    event: {
      events: [],
      status: 'failed',
      error: 'Failed to add event'
    }
  });

  render(
    <Provider store={store}>
      <AddEventForm />
    </Provider>
  );

  expect(screen.getByText(/Failed to add event/i)).toBeInTheDocument();
});

it('displays success message on successful event addition', () => {
  // Setup a store with the state indicating a successful addition
  const store = mockStore({
    event: {
      events: [],
      status: 'succeeded',
      error: null
    }
  });

  render(
    <Provider store={store}>
      <AddEventForm />
    </Provider>
  );

  expect(screen.getByText(/Event added successfully!/i)).toBeInTheDocument();
});

it('displays an error message when the event addition fails', () => {
  const store = mockStore({
    event: {
      events: [],
      status: 'failed',
      error: 'Failed to add event'
    }
  });

  render(
    <Provider store={store}>
      <AddEventForm />
    </Provider>
  );

  expect(screen.getByText(/Failed to add event/i)).toBeInTheDocument();
});



});
