// Instruments
import { getData, getCreateResult, authorize, regexpUUIDv4 } from '_@jest/helpers';

const user = {
    name:     'John Doe',
    email:    'jdoe@email.com',
    phone:    '380975556677',
    password: '!<p@ssW0rd>',
    role:     'CEO',
};

const userFail = {
    name:  'John Doe',
    email: 'jdoe@email.com',
    phone: '380975556677',
    role:  'CEO',
};

describe('staff test', () => {
    beforeAll(authorize);

    test(' GET    staff      ', async (done) => {
        const response = await global.server.get('/api/staff');
        expect(response.statusCode).toBe(200);
        const data = getData(response);

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });

    test(' POST   staff      ', async (done) => {
        const response = await global.server.post('/api/staff').send(user);
        expect(response.statusCode).toBe(201);
        const result = getCreateResult(response);

        expect(typeof result.data).toBe('object');
        expect(result.data.hash).toMatch(regexpUUIDv4);
        done();
    });

    test(' POST   staff fail ', async (done) => {
        const response = await global.server.post('/api/staff').send(userFail);
        expect(response.statusCode).toBe(500);
        const { message } = getCreateResult(response);
        expect(message).toEqual('password not filled');
        done();
    });

    test.skip(' POST   staff 400 - not valid schema', () => {});
    test.skip(' GET    staff 400 - not valid schema', () => {});
});
