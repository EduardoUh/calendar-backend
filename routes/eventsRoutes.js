/* 
    User routes / events
    host + /api.calendarapp/v1/events + param
*/
import express from 'express';
import { check } from 'express-validator';
import { validateJwt, validateFields } from '../middlewares/index.js';
import { isDate } from '../helpers/isDate.js';
import { createEvent, getEvents, updateEvent, removeEvent } from '../controllers/eventsController.js';


const eventsRouter = express.Router();
// since all the endpoints need the token validation I can put that validation in a higher level, like this
eventsRouter.use(validateJwt);

eventsRouter.post('/events',
    [
        check('title').notEmpty().withMessage('Title is a required field'),
        check('notes').notEmpty().withMessage('Notes is a required field'),
        check('start').custom(isDate).withMessage('Invalid start date'),
        check('end').custom(isDate).withMessage('Invalid end date'),
        validateFields
    ],
    createEvent);

eventsRouter.get('/events',
    getEvents
);

eventsRouter.put('/events/:id',
    updateEvent);

eventsRouter.delete('/events/:id',
    removeEvent)

export { eventsRouter };
