// Instruments
import { getCreateResult } from '_@/jest/helpers';
import request from 'supertest';
import { app } from '_@/source/server.js';

const server = request.agent(app);
const credBasic = 'Basic ZW1haWw6cGFzc3dvcmQ='; // email:password

describe('auth test', () => {
    test(' POST   auth login should be 200               ', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .set('Authorization', credBasic)
            .send({});

        expect(response.statusCode).toBe(204);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });

    test(' POST   auth login should be 401 if not cred   ', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .send({});

        expect(response.statusCode).toBe(401);
        const data = getCreateResult(response);

        expect(data).toEqual({message: 'credentials are not valid'});
        done();
    });

    test(' POST   auth login should be 400 if ct not json', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', credBasic)
            .set('Content-type', 'plane-text');

        expect(response.statusCode).toBe(400);
        done();
    });
});
