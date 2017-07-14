const log = require('./log');

// info :: String|Object -> null
const info = data => log('--> ', data, '\n');

module.exports = info;
