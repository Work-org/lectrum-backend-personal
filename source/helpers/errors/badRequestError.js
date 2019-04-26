export class BadRequestError extends Error {
    constructor(...args) {
        super(...args);
        const [ , statusCode = 400 ] = args;

        if (typeof statusCode !== 'number') {
            throw new Error('can not construct BadRequestError due to arguments error');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
            throw new Error(
                'statusCode in BadRequestError should be a number in range from 100 to 599',
            );
        }

        Error.captureStackTrace(this, BadRequestError);
        this.name = 'BadRequestError';
        this.statusCode = statusCode;
    }
}
