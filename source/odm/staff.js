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
}, userOptions);

export const staff = user.discriminator('staff', schema);
