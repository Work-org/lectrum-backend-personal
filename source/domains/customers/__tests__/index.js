// Instruments
import { getData, getCreateResult, authorize, regexpUUIDv4 } from '_@jest/helpers';

let hash = null;

const authorizeBy = async (type) => {
    hash = global.authUser(type);
    await authorize(() => ({}));
};

const logout = async () => {
    await global.server.post('/api/logout');
};

const customer = {
    name:    'Patricia Lumumba',
    email:   'pl@email.com',
    phone:   '380931112239',
    city:    'oslo',
    country: 'UK',
};

describe('customers test', () => {
    test(' GET    customers 200 OK           ', async (done) => {
        await authorizeBy('staff');
        const response = await global.server.get('/api/customers');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toBeNull();
        await logout();
        done();
    });

    test(' GET    customers 403 access denied', async (done) => {
        await authorizeBy('customer');
        const response = await global.server.get('/api/customers');
        expect(response.statusCode).toBe(403);
        await logout();
        done();
    });

    test.skip(' GET    customers 400 empty hash   ', () => {});

    /*test(' GET    customers 400 empty hash   ', async (done) => {
        try {
            await authorizeBy('customer');
            const response = await global.server.get(`/api/customers/${null}`);
            expect(response.statusCode).toBe(400);
        } catch (error) {
            console.log('-->', error);
        }

        await logout();
        done();
    });*/

    test(' POST   customers 200 OK           ', async (done) => {
        await authorizeBy('customer');
        const response = await global.server.post('/api/customers').send(customer);
        expect(response.statusCode).toBe(201);
        const data = getCreateResult(response);

        expect(data).toMatch(regexpUUIDv4);
        await logout();
        done();
    });

    test(' GET    customers/:hash            ', async (done) => {
        await authorizeBy('customer');
        const response = await global.server.get(`/api/customers/${hash}`);
        expect(response.statusCode).toBe(200);
        const { hash: hashUpdated } = getCreateResult(response);

        expect(hashUpdated).toBe(hash);
        expect(hashUpdated).toMatch(regexpUUIDv4);
        await logout();
        done();
    });

    test(' PUT    customers/:hash            ', async (done) => {
        await authorizeBy('customer');
        const response = await global.server.put(`/api/customers/${hash}`).send({});
        expect(response.statusCode).toBe(200);
        const { hash: hashUpdated } = getCreateResult(response);

        expect(hashUpdated).toBe(hash);
        expect(hashUpdated).toMatch(regexpUUIDv4);
        await logout();
        done();
    });

    test.skip(' DELETE customers/:hash       ', () => {});

    /*test(' DELETE customers/:hash', async (done) => {
        await authorizeBy('staff');
        const newCustomer = await global.server.post('/api/customers').send(customer);
        const hashDelete = getCreateResult(newCustomer);

        const response = await global.server.delete(`/api/customers/${hashDelete}`);
        expect(response.statusCode).toBe(204);
        done();
    });*/
    test.skip(' POST   customers 400 - not valid schema', () => {});
});
