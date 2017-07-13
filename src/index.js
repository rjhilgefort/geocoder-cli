#!/usr/bin/env node

require('dotenv').config();
const { log } = require('./lib');
const geocodeFile = require('./geocode-file');

// TODO: Use `commander` or something to easier facilitate file from CLI
const result = geocodeFile(process.env.API_KEY)('../data/addresses.csv');

log(result);
