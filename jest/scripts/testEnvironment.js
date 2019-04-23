require('@babel/register')({
    presets: [ '@babel/preset-env' ],
});

// Core
const NodeEnvironment = require('jest-environment-node');

// Instruments
const { app } = require('../../source/server.js');
const request = require('supertest');

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        await super.setup();
        const staffPrimaryTrue = 'Basic amRvZUBlbWFpbC5jb206ITxwQHNzVzByZD4=';

        const server = request.agent(app);
        this.global.server = server;

        //@todo https://github.com/rjz/supertest-session
        this.global.authorize = async (callback = () => ({})) => {
            const response = await server
                .post('/api/auth/login')
                .set('Content-type', 'application/json')
                .set('Authorization', staffPrimaryTrue)
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
