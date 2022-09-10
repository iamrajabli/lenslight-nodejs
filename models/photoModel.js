import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export const Photo = model('Photo', photoSchema);


