import express from 'express';
const router = express.Router();
import { createTicket, getTicketsForEvent, updateTicket, deleteTicket } from '../controllers/ticketController';

// Routes for tickets
router.route('/event/:eventId/tickets')
  .get(getTicketsForEvent) 
  .post(createTicket); 

router.route('/ticket/:ticketId')
  .put(updateTicket) 
  .delete(deleteTicket); 

export default router;
