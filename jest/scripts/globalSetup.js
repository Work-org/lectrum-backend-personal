// Core
const chalk = require('chalk');
const path = require('path');

require('dotenv').config({ path: path.resolve('.env.test') });

module.exports = function() {
    // eslint-disable-next-line
    console.log(chalk.green('λ -> run tests BACKEND-PERSONAL Osadchiy V.'));
};
