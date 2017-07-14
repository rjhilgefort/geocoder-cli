const log = require('./log');

// error :: String|Object -> null
const error = data => log('!!! ', data, '\n');

module.exports = error;
