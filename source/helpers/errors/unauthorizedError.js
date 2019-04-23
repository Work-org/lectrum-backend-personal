export class UnauthorizedError extends Error {
    constructor(...args) {
        super(...args);
        const [ , statusCode = 401 ] = args;

        if (typeof statusCode !== 'number') {
            throw new Error('can not construct UnauthorizedError due to arguments error');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
            throw new Error(
                'statusCode in UnauthorizedError should be a number in range from 100 to 599',
            );
        }

        Error.captureStackTrace(this, UnauthorizedError);
        this.name = 'UnauthorizedError';
        this.statusCode = statusCode;
    }
}
