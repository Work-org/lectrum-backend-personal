// Core
import { Schema, model } from 'mongoose';

// Document shape
const schema = new Schema({
    title: {
        type:     String,
        required: true,
    },
    description: {
        type:      String,
        maxlength: 250,
    },
    price: {
        type:     Number,
        required: true,
        min:      0,
    },
    discount: {
        type:     Number,
        required: true,
        min:      0,
        max:      50,
    },
    total: {
        type:     Number,
        required: true,
        default:  1,
    },
});

schema
    .virtual('pid')
    .get(function() {
        return this.id;
    });

// Collection
export const products = model('product', schema);
