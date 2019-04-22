// Core
import { model } from 'mongoose';
import { baseSchema } from './_base';

// Document shape
const schema = baseSchema.clone();
const userOptions = { discriminatorKey: '_usr', _id: false };

schema.add({
    name: {
        first: {
            type:      String,
            required:  true,
            minlength: 2,
            maxlength: 15,
        },
        last: {
            type:      String,
            required:  true,
            minlength: 2,
            maxlength: 15,
        },
    },
    emails: [
        {
            email: {
                match:    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                type:     String,
                dropDups: true,
                unique:   true,
            },
            primary: { type: Boolean, default: false },
        },
    ],
    phones: [
        {
            phone:   String,
            primary: { type: Boolean, default: false },
        },
    ],
    password: String,
});

schema.set('toObject', {
    transform: function(doc, ret) {
        delete ret._id;
        delete ret._usr;
        delete ret.password;
        delete ret.disabled;
    },
});

schema.set('discriminatorKey', userOptions.discriminatorKey);

schema.index({'name,first': 1, 'name.last': 1});
schema.index({'name,first': 'text', 'name.last': 'text'});

// Collection
const user = model('user', schema);

export { user, userOptions };

