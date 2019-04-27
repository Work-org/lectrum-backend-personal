// Core
import { Schema, model } from 'mongoose';

// Instruments
import { customers } from './customers';
import { products } from './products';

// Document shape
const schema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref:  customers,
    },
    pid: {
        type: Schema.Types.ObjectId,
        ref:  products,
    },
    count: {
        type:     Number,
        required: true,
        min:      0,
        max:      1000,
    },
    comment: {
        type:      String,
        maxlength: 250,
    },
});

// Collection
export const orders = model('order', schema);
