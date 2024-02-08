// import { useState, ChangeEvent, FormEvent } from 'react';
// import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { useDispatch } from 'react-redux';


// interface FormErrors {
//   eventName?: string;
//   date?: string;
//   description?: string;
//   // Include error states for ticket information
// }

// interface Ticket {
//   name: string;
//   type: string;
//   price: number;
//   bookingFee: number;
//   availability: 'available' | 'sold out';
// }

// interface FormValues {
//   eventName: string;
//   date: string;
//   description: string;
//   tickets: Ticket;
// }

// const initialTicketState: Ticket = { name: '', type: 'adult', price: 0, bookingFee: 0, availability: 'available' };

// export default function AddEvent() {
//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [formValues, setFormValues] = useState<FormValues>({
//     eventName: '',
//     date: '',
//     description: '',
//     tickets: initialTicketState,
//   });

//   const dispatch = useDispatch();

//   const handleAddTicket = () => {
//     setFormValues(prevState => ({
//       ...prevState,
//       tickets: ...prevState.tickets,
//     }));
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
//     const validate = () => {
//     let errors: FormErrors = {};
//     if (!formValues.eventName) errors.eventName = "Event name is required";
//     if (!formValues.date) errors.date = "Date is required";
//     // Add more validations as needed
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
//     if (typeof index === 'number') {
//       // Handle change for ticket fields
//       const updatedTickets = formValues.tickets.map((ticket, i) => {
//         if (i === index) {
//           return { ...ticket, [event.target.name]: event.target.value };
//         }
//         return ticket;
//       });
//       setFormValues({ ...formValues, tickets: updatedTickets });
//     } else {
//       // Handle change for event fields
//       setFormValues({ ...formValues, [event.target.name]: event.target.value });
//     }
//   };

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     console.log(formValues);
//     // Dispatch form data to the store or API call
//   };

//   return (
//     <div style={{ width: '100%', marginTop: '20px' }}>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12} md={6}>
//           <h2>Add Event</h2>
//           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//             {/* Event Name, Date, Description Fields */}
//             <TextField
//         name="eventName"
//         label="Event Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={formValues.eventName}
//         onChange={handleChange}
//         error={!!formErrors.eventName}
//         helperText={formErrors.eventName}
//       />
//       <TextField
//         name="date"
//         label="Date"
//         type="date"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true }}
//         value={formValues.date}
//         onChange={handleChange}
//         error={!!formErrors.date}
//         helperText={formErrors.date}
//       />
//       <TextField
//         name="description"
//         label="Description"
//         variant="outlined"
//         multiline
//         rows={4}
//         fullWidth
//         margin="normal"
//         value={formValues.description}
//         onChange={handleChange}
//         error={!!formErrors.description}
//         helperText={formErrors.description}
//       />
//                 <TextField
//                   name="name"
//                   label="Ticket Name"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formValues.tickets.name}
//                   onChange={(e) => handleChange(e)}
//                 />
//                 <TextField
//                   name="Booking Fee"
//                   label="Booking Fee"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formValues.tickets.bookingFee}
//                   onChange={(e) => handleChange(e)}
//                 />
//                 <TextField
//                   name="Price"
//                   label="Price"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formValues.tickets.price}
//                   onChange={(e) => handleChange(e)}
//                 />
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Type</InputLabel>
//                   <Select
//                     name="type"
//                     value={formValues.tickets.type}
//                     onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
//                     label="Type"
//                   >
//                     <MenuItem value="adult">Adult</MenuItem>
//                     <MenuItem value="family">Family</MenuItem>
//                     <MenuItem value="child">Child</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Availability</InputLabel>
//                   <Select
//                     name="availability"
//                     value={formValues.tickets.availability}
//                     onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
//                     label="Availability"
//                   >
//                     <MenuItem value="available">Available</MenuItem>
//                     <MenuItem value="sold out">Sold Out</MenuItem>
//                   </Select>
//                   <TextField
//                   name="quantity"
//                   label="Enter Quantity"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formValues.tickets.price}
//                   onChange={(e) => handleChange(e)}
//                 />
//                 </FormControl>
//             <Button onClick={handleAddTicket} variant="contained">Add Ticket</Button>
//             <Button type="submit" variant="contained" color="primary">Submit</Button>
//           </form>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
