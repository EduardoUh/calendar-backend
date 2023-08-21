import express from "express";
import 'dotenv/config';
import cors from 'cors';

import { dbConnection } from './database/config.js';
import { authRouter, eventsRouter } from './routes/index.js';


// creating express app
const app = express();
const router = express.Router();

// function to connect to db
dbConnection();

// cors (cross-origin resource sharing)
app.use(cors());

// public 
app.use(express.static('public'));

// Read and parse the body
// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// routes
app.use('/api.calendarapp/v1/', authRouter);
app.use('/api.calendarapp/v1/', eventsRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
