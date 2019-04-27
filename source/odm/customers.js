// Core
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Instruments
import { user, userOptions } from './user';

const schema = new Schema({
    city:    String,
    country: String,
}, userOptions);

schema.index({ country: 1, city: 1});
schema.index({ country: 'text', city: 'text'});

schema.pre('save', async function (next) {
    if (this.isModified()) {
        const password = Math.random().toString(36)
            .slice(2);

        this.password = await bcrypt.hash(password, 11);
    }

    next();
});

schema
    .virtual('uid')
    .get(function() {
        return this.id;
    });

export const customers = user.discriminator('customer', schema);
