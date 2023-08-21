/* 
    tokens:
    Eduardo - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGRlNmQ3MzAzZDIxZmU0YzJmNzJkZGYiLCJuYW1lIjoiZWR1YXJkbyIsImlhdCI6MTY5MjU5NTU4MiwiZXhwIjoxNjkyNjAyNzgyfQ.w-woP8AJhGbiqyrQfAhK80dSGBKPAbnQfn3gGYzw8uo
    Iván - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGUyYzA0MzFlNzBiMDdkYWM0ZTVlMmQiLCJuYW1lIjoiaXbDoW4iLCJpYXQiOjE2OTI1OTU1MDksImV4cCI6MTY5MjYwMjcwOX0.k7a7i2M2rL9oLnhmCvReGm7TEp_ic9WvPDpkrU6GWpU
*/


import { response } from "express";
import { Event } from '../models/Event.js';


export const createEvent = async (req, res = response) => {
    const { body, uid: user } = req;
    const newEvent = new Event({ ...body, user });
    try {
        const event = await newEvent.save();
        res.status(201).json({
            ok: true,
            event,
            message: 'Event successfully created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something went wrong while creating new event, retry or contact the support team'
        });
    }
}

export const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find()
            .populate('user', 'name');
        res.status(200).json({
            ok: true,
            events,
            message: 'List of events successfully fetched'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something went wrong, retry or contact the support team'
        });
    }
}

export const updateEvent = async (req, res = response) => {
    const { uid: userId } = req;
    const { id: _id } = req.params;
    const { body } = req;

    if (!body || !_id) {
        return res.status(400).json({
            ok: false,
            message: 'Event unique identifier and data are to update are required'
        });
    }

    try {
        const event = await Event.findById(_id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Unexistant event'
            });
        }

        if (event.user.toHexString() !== userId) {
            return res.status(401).json({
                ok: false,
                message: 'Only the author of the event can modify the event'
            });
        }

        const updatedEvent = await Event.findOneAndUpdate({ _id }, body, { new: true })
            .populate('user', 'name');
        res.status(200).json({
            ok: true,
            updatedEvent,
            message: 'Event successfully updated'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something went wrong, retry or contact the support team'
        });
    }

}

export const removeEvent = async (req, res = response) => {
    const { uid } = req;
    const { id: _id } = req.params;
    try {
        const event = await Event.findById(_id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Unexistant event'
            });
        }
        if (event.user.toHexString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'Only the author of the event can remove the event'
            });
        }
        await Event.findOneAndDelete({ _id });
        res.status(200).json({
            ok: true,
            message: 'Event succesfully removed'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something went wrong while removing event, retry or contact the support team'
        });
    }
}
