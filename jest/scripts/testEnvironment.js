require('@babel/register')({
    presets: [ '@babel/preset-env' ],
});

// Core
const NodeEnvironment = require('jest-environment-node');

// Instruments
const { app } = require('../../source/server.js');
const request = require('supertest');

const staffPrimaryTrue = 'Basic amRvZUBlbWFpbC5jb206ITxwQHNzVzByZD4=';
const customerPrimaryTrue = 'Basic amNoYW5AZW1haWwuY29tOiE8cEBzc1cwcmQ+';
let authHead = staffPrimaryTrue;

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        await super.setup();

        const server = request.agent(app);
        this.global.server = server;

        const authUser = (type) => {
            switch (type) {
                case 'staff':  authHead = staffPrimaryTrue;

                    return '8544c1df-b199-44e4-86d5-25e10f09b764';
                case 'customer':  {
                    authHead = customerPrimaryTrue;

                    return '9efc8ced-cbf0-4b01-83c7-073e8ad36b81';
                }

                default: authHead = null;

                    return null;
            }
        };

        this.global.authUser = authUser;

        //@todo https://github.com/rjz/supertest-session
        this.global.authorize = async (callback = () => ({})) => {
            const response = await server
                .post('/api/auth/login')
                .set('Content-type', 'application/json')
                .set('Authorization', authHead)
                .send({});

            callback(response); // for test authorize
            const cookie = response.headers[ 'set-cookie' ][ 0 ];

            this.global.server.jar.setCookie(cookie);
        };
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;
