const readline = require('readline');
const fs = require('fs');
const path = require('path');
const https = require('https');
const {
  info, error, pipe, append, prepend, replace
} = require('./utils');

// NOTE: Assumes that all addresses are wrapped in quotes
// sanitizeAddress :: String -> String
const sanitizeAddress = data => data.trim().slice(1, -1);

// buildRequestPath :: String => String -> String
const buildRequestPath = token => data =>
  pipe(
    replace(/ /g)('+'),
    prepend('/maps/api/geocode/json?address='),
    append(`&key=${token}`),
  )(data);

// buildRequestOptions :: String -> Object
const buildRequestOptions = data => ({
  host: 'maps.googleapis.com',
  path: data
});

// callWithParsedResponse :: Function => Stream -> a(b)
const callWithParsedResponse = func => response => {
  response.setEncoding('utf8');

  let body = '';
  response.on('data', (data) => { body += data; });

  // TODO: Handle malformed JSON
  response.on('end', () => func(JSON.parse(body)));
};

const handleGeocode = data => {
  info(data);
  return data;
};

// geocodeFile :: String => String -> STDOUT
const geocodeFile = token => file => {
  let lineNumber = 0;
  const processLine = line => {
    lineNumber += 1;
    if (lineNumber === 1) {
      return error(`Skipping CSV Header: ${line}`);
    }

    const options = pipe(
      sanitizeAddress,
      buildRequestPath(token),
      buildRequestOptions,
    )(line);

    info(options);

    https.request(options, callWithParsedResponse(handleGeocode))
      .on('error', error)
      .end();

    return null;
  };

  readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, file))
  })
    .on('line', processLine);
};

module.exports = geocodeFile;
