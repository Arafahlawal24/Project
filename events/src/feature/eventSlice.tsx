import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface Ticket {
  id: string;
  name: string;
  type: string; // 'adult', 'family', 'child'
  price: number;
  bookingFee: number;
  availability: number;
}

interface Event {
  id: string;
  eventName: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: {
      reducer: (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      },
      prepare: (data: Omit<Event, 'id' | 'tickets'> & { tickets: Omit<Ticket, 'id'>[] }) => {
        const id = nanoid();
        const ticketsWithIds = data.tickets.map(ticket => ({ ...ticket, id: nanoid() }));
        return { payload: { ...data, id, tickets: ticketsWithIds } };
      },
    },
  },
});

export const { addEvent } = eventSlice.actions;

export const selectEvents = (state: RootState) => state.event.events;

export default eventSlice.reducer;
