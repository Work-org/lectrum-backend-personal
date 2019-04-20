// Core
import { Schema } from 'mongoose';

// Instruments
import { user, userOptions } from './user';

const schema = Schema({
    password: String,
    role:     {
        type:     String,
        required: true,
    },
    disabled: Boolean,
}, {
    ...userOptions,
    toObject: {
        transform: function(doc, ret) {
            delete ret.password;
        },
    },
});

export const staff = user.discriminator('staff', schema);
