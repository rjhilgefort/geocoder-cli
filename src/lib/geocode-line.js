const { pipe, append, prepend, replace } = require('../utils');
const request = require('./request');

const { API_KEY } = process.env;

// NOTE: Assumes that all addresses are wrapped in quotes
// sanitizeAddress :: String -> String
const sanitizeAddress = data => data.trim().slice(1, -1);

// buildRequestPath :: String -> String
const buildRequestPath = data =>
  pipe(
    replace(/ /g)('+'),
    prepend('/maps/api/geocode/json?address='),
    append(`&key=${API_KEY}`),
  )(data);

// buildRequestOptions :: String -> Object
const buildRequestOptions = data => ({
  host: 'maps.googleapis.com',
  path: data
});

// geocodeLine :: String => Function -> void
const geocodeLine = line => cb => {
  // TODO: If `utils.__` were to be implemented, pipe right into request
  const options = pipe(
    sanitizeAddress,
    buildRequestPath,
    buildRequestOptions,
  )(line);

  request(options, cb);
};

module.exports = geocodeLine;
