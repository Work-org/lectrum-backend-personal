// Core
const chalk = require('chalk');
const path = require('path');

// May require additional time for downloading MongoDB binaries
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
// jest.setTimeout(30000);

require('dotenv').config({ path: path.resolve('.env.test') });

module.exports = function() {
    // eslint-disable-next-line
    console.log(chalk.green('λ -> run tests BACKEND-PERSONAL Osadchiy V.'));
};
