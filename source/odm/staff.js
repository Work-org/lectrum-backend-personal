// Core
import { model } from 'mongoose';
import { baseSchema } from './_base';

// Document shape
const schema = baseSchema.clone();
schema.add({
    name: {
        first: String,
        last:  String,
    },
    emails: [
        {
            email:   String,
            primary: Boolean,
        },
    ],
    phones: [
        {
            phone:   String,
            primary: Boolean,
        },
    ],
    password: String,
    role:     String,
    disabled: Boolean,
});

// Collection
export const staff = model('staff', schema);
