const uuid = require('uuid');

module.exports.hashPlugin = (schema, options) => {
    const { version } = options;

    const isValid = [ 'v1', 'v4' ].some((item) => item === version);

    if (!isValid) {
        throw new Error('Not valid uuid version');
    }

    schema.add({
        hash: {
            type:     String,
        },
    });

    schema.index({ hash: 1});

    schema.pre('save', function(next) {
        this.hash = uuid[ version ]();
        next();
    });
};
