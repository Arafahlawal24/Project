export interface Event {
  _id?: string;
  name: string;
  date: string;
  description: string;
  tickets: Ticket[];
}

export interface Ticket {
  _id?: string;
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}