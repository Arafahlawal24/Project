import express from 'express';
const router = express.Router();
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '../controllers/eventController'; 

router.route('/event')
.post(createEvent);

router.route('/event/:id')
.get(getEvent)
.put(updateEvent)
.delete(deleteEvent);

router.route('/events').get(getEvents);

export default router;
