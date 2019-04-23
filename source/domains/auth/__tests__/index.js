// Instruments
import request from 'supertest';
import { app } from '_@source/server.js';
import { getCreateResult } from '_@/jest/helpers';

const server = request.agent(app);

//jdoe@email.com:!<p@ssW0rd> {primary: true} staff
const staffPrimaryTrue = 'Basic amRvZUBlbWFpbC5jb206ITxwQHNzVzByZD4=';

//jdoe2@email.com:!<p@ssW0rd> {primary: false} staff
const staffPrimaryFalse = 'Basic amRvZTJAZW1haWwuY29tOiE8cEBzc1cwcmQ+';

//jchan@email.com:!<p@ssW0rd> {primary: true} customer
//@todo how check session supertest on user discriminator?
// const customerPrimaryTrue = 'Basic amNoYW5AZW1haWwuY29tOiE8cEBzc1cwcmQ+';

describe('auth test', () => {
    test(' POST   auth login should be 204                  ', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .set('Authorization', staffPrimaryTrue)
            .send({});

        expect(response.statusCode).toBe(204);
        const data = getCreateResult(response);

        expect(data).toEqual({});
        done();
    });

    test(' POST   auth login should be 401 not primary email', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .set('Authorization', staffPrimaryFalse)
            .send({});

        expect(response.statusCode).toBe(401);
        const data = getCreateResult(response);

        expect(data).toEqual({message: 'Credential incorrect'});
        done();
    });

    test(' POST   auth login should be 401 if not cred      ', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .send({});

        expect(response.statusCode).toBe(401);
        const data = getCreateResult(response);

        expect(data).toEqual({message: 'credentials are not valid'});
        done();
    });

    test(' POST   auth login should be 400 if ct not json   ', async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', staffPrimaryTrue)
            .set('Content-type', 'plane-text');

        expect(response.statusCode).toBe(400);
        done();
    });

    test.skip(' POST   auth login 400 - not valid schema', () => {});
});
