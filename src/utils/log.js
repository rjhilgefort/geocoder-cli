/* eslint-disable no-console */
const isObject = require('./is-object');

const log = (...args) => {
  console.log(
    ...args.map(
      (arg) => (isObject(arg) ? JSON.stringify(arg, null, 4) : arg)
    )
  );
};

module.exports = log;
