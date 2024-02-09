import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { createSelector } from 'reselect';

interface Ticket {
  _id?: string;
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

interface EventFormValues {
  _id?: string;
  name: string;
  date: string;
  description: string;
  tickets: Ticket[]; 
}

interface EventState {
  events: EventFormValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk<EventFormValues[], undefined, { rejectValue: string }>(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<EventFormValues[]>('http://localhost:3500/api/events');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEvent = createAsyncThunk<EventFormValues, EventFormValues, { rejectValue: string }>(
  'events/addEvent',
  async (eventData: EventFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post<EventFormValues>('http://localhost:3500/api/event', eventData);
      console.log(eventData);
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data)
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectEventState  = (state: RootState) => state.event  ;
export const selectEventsError = (state: RootState) => state.event.error;
export const selectEventsStatus = (state: RootState) => state.event.status;
export const selectAllEvents = createSelector(
  [selectEventState],
  (eventState) => eventState.events
);

export default eventSlice.reducer;
