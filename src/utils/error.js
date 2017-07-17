const log = require('./log');

// error :: String|Object -> null
const error = data => log('!!! ', data);

module.exports = error;
