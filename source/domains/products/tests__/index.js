// Instruments
import { getData, getCreateResult, authorize } from '_@jest/helpers';

describe('products test', () => {
    beforeAll(authorize);

    test(' GET    products      ', async (done) => {
        const response = await global.server.get('/api/products');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual([]);
        done();
    });

    test(' POST   products      ', async (done) => {
        const response = await global.server.post('/api/products').send({});
        expect(response.statusCode).toBe(200);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });

    test(' GET    products/:hash', async (done) => {
        const response = await global.server.get('/api/products/{hash}');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' PUT    products/:hash', async (done) => {
        const response = await global.server.put('/api/products/{hash}').send({});
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual({});
        done();
    });

    test(' DELETE products/:hash', async (done) => {
        const response = await global.server.delete('/api/products/{hash}');
        expect(response.statusCode).toBe(204);
        done();
    });
});
