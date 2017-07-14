#!/usr/bin/env node

require('dotenv').config();
const geocodeFile = require('./geocode-file');

// TODO: Use `commander` or something to easier facilitate `DATA_FILE` from CLI
const { API_KEY, DATA_FILE } = process.env;

geocodeFile(API_KEY)(DATA_FILE);
