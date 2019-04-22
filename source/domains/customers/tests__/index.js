// Instruments
import { getData, getCreateResult, authorize } from '_@jest/helpers';

describe('customers test', () => {
    beforeAll(authorize);

    test(' GET    customers      ', async (done) => {
        const response = await global.server.get('/api/customers');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual([]);
        done();
    });

    test(' POST   customers      ', async (done) => {
        const response = await global.server.post('/api/customers').send({});
        expect(response.statusCode).toBe(200);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });

    test(' GET    customers/:hash', async (done) => {
        const response = await global.server.get('/api/customers/{hash}');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' PUT    customers/:hash', async (done) => {
        const response = await global.server.put('/api/customers/{hash}').send({});
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' DELETE customers/:hash', async (done) => {
        const response = await global.server.delete('/api/customers/{hash}');
        expect(response.statusCode).toBe(204);
        done();
    });
});
