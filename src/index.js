#!/usr/bin/env node

require('dotenv').config();
const { info } = require('./utils');
const geocodeFile = require('./geocode-file');

// TODO: Use `commander` or something to easier facilitate `DATA_FILE` from CLI
const { DATA_FILE } = process.env;

geocodeFile(DATA_FILE)(() => {
  info('END OF FILE, EXITING');
  process.exit(0);
});
