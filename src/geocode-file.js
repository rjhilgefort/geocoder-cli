const fs = require('fs');
const path = require('path');
const { lineStream, geocodeStream } = require('./lib');

// geocodeFile :: String -> STDOUT
const geocodeFile = file =>
  fs.createReadStream(path.join(__dirname, file))
    .pipe(lineStream)
    .pipe(geocodeStream);

module.exports = geocodeFile;
