const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { info, error } = require('./utils');
const { geocodeLine } = require('./lib');

// geocodeFile :: String -> STDOUT
const geocodeFile = file => cb => {
  // TODO: Would be great to have better control mechanisms via
  //       lazy streams and/or promises.
  let isEOF = false;
  let lineNumber = 0;
  let lastReadLine = 0;
  let lastGeocodedLine = 0;

  const processLine = line => {
    lineNumber += 1;
    info(line);
    if (lineNumber === 1) {
      return error(`Skipping CSV Header: ${line}`);
    }

    geocodeLine(line)((err, res) => {
      if (err) return error(err);
      info(res);
      lastGeocodedLine += 1;

      info(lastGeocodedLine);
      info(lastReadLine);
      info(isEOF);
      // If we've processed all the lines read, and
      // there are no more lines to process, then we're done
      if ((lastGeocodedLine === lastReadLine) && isEOF) {
        return cb();
      }

      return res;
    });

    lastReadLine += 1;
    return line;
  };

  readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, file))
  })
    .on('line', processLine)
    .on('close', () => { isEOF = true; });
};

module.exports = geocodeFile;
