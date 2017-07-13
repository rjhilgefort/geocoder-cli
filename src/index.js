#!/usr/bin/env node

require('dotenv').config();
const { log, pipe } = require('./lib');
const geocodeFile = require('./geocode-file');

// TODO: Use `commander` or something to easier facilitate `DATA_FILE` from CLI
const { API_KEY, DATA_FILE } = process.env;

pipe(
  geocodeFile(API_KEY),
  log
)(DATA_FILE);
