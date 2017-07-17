const log = require('./log');

// info :: String|Object -> null
const info = data => log('--> ', data);

module.exports = info;
