const { log } = require('./lib');

// geocodeFile :: String => String -> Array[Object{lat,lng}]
const geocodeFile = token => file => {
  log(token);
  log(file);
  return [];
};

module.exports = geocodeFile;
