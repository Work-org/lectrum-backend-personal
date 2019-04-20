require('@babel/register')({
    presets: [ '@babel/preset-env' ],
});

// Core
const NodeEnvironment = require('jest-environment-node');
const request = require('supertest');

// Instruments
const { app } = require('../../source/server.js');
const server = request.agent(app);

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        await super.setup();
        const credBasic = 'Basic ZW1haWw6cGFzc3dvcmQ='; // email:password

        this.global.server = server;
        this.global.authorize = async (callback = function () {}) => {
            const response = await server
                .post('/api/auth/login')
                .set('Content-type', 'application/json')
                .set('Authorization', credBasic)
                .send('');

            callback(response); // for test authorize
            const cookie = response.headers[ 'set-cookie' ][ 0 ];

            server.jar.setCookie(cookie);
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
