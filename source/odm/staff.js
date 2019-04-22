// Core
import { Schema } from 'mongoose';

// Instruments
import { user, userOptions } from './user';

const schema = Schema({
    role: {
        type:     String,
        required: true,
    },
    disabled: Boolean,
}, {
    ... userOptions,
    toObject: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret._usr;
            delete ret.password;
            delete ret.disabled;
        },
    },
});

export const staff = user.discriminator('staff', schema);
