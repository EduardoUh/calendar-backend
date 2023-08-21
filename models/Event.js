import { Schema, model } from 'mongoose';


const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    notes: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// returning a more clean object, for more info refer to the documentation, 
eventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const Event = model('Event', eventSchema);
