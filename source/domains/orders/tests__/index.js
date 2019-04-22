// Instruments
import { getData, getCreateResult, authorize } from '_@jest/helpers';

describe('orders test', () => {
    beforeAll(authorize);

    test(' GET    orders      ', async (done) => {
        const response = await global.server.get('/api/orders');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual([]);
        done();
    });

    test(' POST   orders      ', async (done) => {
        const response = await global.server.post('/api/orders').send({});
        expect(response.statusCode).toBe(200);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });

    test(' GET    orders/:hash', async (done) => {
        const response = await global.server.get('/api/orders/{hash}');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' PUT    orders/:hash', async (done) => {
        const response = await global.server.put('/api/orders/{hash}').send({});
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' DELETE orders/:hash', async (done) => {
        const response = await global.server.delete('/api/orders/{hash}');
        expect(response.statusCode).toBe(204);
        done();
    });
});
