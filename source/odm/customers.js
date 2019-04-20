// Core
import { Schema } from 'mongoose';

// Instruments
import { user, userOptions } from './user';

const schema = new Schema({
    city:     String,
    country:  String,
    password: String,
}, userOptions);

schema.index({ country: 1, city: 1});
schema.index({ country: 'text', city: 'text'});

export const customers = user.discriminator('customer', schema);
