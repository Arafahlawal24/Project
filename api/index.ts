import express from 'express';
import 'dotenv/config';
require('dotenv').config();
import connectDb from './config/db';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes';
import ticketRoutes from './routes/ticketRoutes';
import cors from 'cors';
connectDb();

const app = express();
const port = process.env.PORT;
const router = express.Router();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}))     
app.use('/api', eventRoutes); 
app.use('/api', ticketRoutes);

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));