// Core
import { Schema } from 'mongoose';
import autopopulatePlugin from 'mongoose-autopopulate';
import leanVirtualPlugin from 'mongoose-lean-virtuals';

// Instrument
import { hashPlugin } from '_@source/plugins';

// Document shape
const base = new Schema({

}, {
    timestamps: {
        createdAt: 'created',
        updateAt:  'modified',
    },
    autoIndex: false,
    toObject:  {
        getters:   true,
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    },

    // bug https://github.com/Automattic/mongoose/issues/7458
    // versionKey: false,
    collation: { locale: 'en_US', numericOrdering: true },
});

base.plugin(autopopulatePlugin);
base.plugin(leanVirtualPlugin);
base.plugin(hashPlugin, { version: 'v4' });

export { base as baseSchema };
