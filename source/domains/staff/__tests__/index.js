// Instruments
import { getData, getCreateResult, authorize } from '_@jest/helpers';

describe('staff test', () => {
    beforeAll(authorize);

    test(' GET    staff      ', async (done) => {
        const response = await global.server.get('/api/staff');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(data).toEqual([]);
        done();
    });

    test(' POST   staff      ', async (done) => {
        const response = await global.server.post('/api/staff').send({});
        expect(response.statusCode).toBe(200);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });
});
