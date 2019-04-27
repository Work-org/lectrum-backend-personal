export class PurchaseError extends Error {
    constructor(code, ...args) {
        super(...args);
        const [ , statusCode = 400, data ] = args;
        this.purchaseErrorCode = code;
        this.data = data;

        if (typeof statusCode !== 'number') {
            throw new Error('can not construct PurchaseError due to arguments error');
        }

        if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
            throw new Error(
                'statusCode in PurchaseError should be a number in range from 100 to 599',
            );
        }

        Error.captureStackTrace(this, PurchaseError);
        this.name = 'PurchaseError';
        this.statusCode = statusCode;
    }
}
