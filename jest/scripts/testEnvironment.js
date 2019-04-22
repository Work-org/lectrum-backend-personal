require('@babel/register')({
    presets: [ '@babel/preset-env' ],
});

// Core
const NodeEnvironment = require('jest-environment-node');
const MongoMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');

// Instruments
const { app } = require('../../source/server.js');

const request = require('supertest');
let mongoServer = null;
const mongooseOpts = {
    autostart:         true,
    debug:             true,
    autoReconnect:     true,
    reconnectTries:    Number.MAX_VALUE,
    reconnectInterval: 1000,
};

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
    }

    async setup() {
        await super.setup();
        const credBasic = 'Basic ZW1haWw6cGFzc3dvcmQ='; // email:password
        console.log('NodeEnvironment -->');

        this.global.connectMongoMemory = async () => {
            mongoServer = new MongoMemoryServer();
            const mongoUri = await mongoServer.getConnectionString();
            console.log('1-->', mongoUri);

            mongoose.connection.on('error', (error) => {
                if (error.message.code === 'ETIMEDOUT') {
                    console.log(error);
                    mongoose.connect(mongoUri, mongooseOpts);
                }
                console.log(error);
            });

            mongoose.connection.once('open', () => {
                console.log(`MongoDB successfully connected to ${mongoUri}`);
            });
        };

        this.global.disconnectMongoMemory = async () => {
            mongoose.disconnect();
            await mongoServer.stop();
        };

        // await this.global.connectMongoMemory();
        const server = request.agent(app);
        this.global.server = server;
        this.global.authorize = async (callback = function () {}) => {
            const response = await server
                .post('/api/auth/login')
                .set('Content-type', 'application/json')
                .set('Authorization', credBasic)
                .send('');

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
