import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

// returning a more clean object, for more info refer to the documentation, 
userSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const User = model('User', userSchema);
