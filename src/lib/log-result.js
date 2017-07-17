const { log, info, error } = require('../utils');

const { LOG_LEVEL } = process.env;

// logResult :: String => (Function, Function) -> void
const logResult = subject => (err, res) => {
  // Only show error results for non-prod
  if ((parseInt(LOG_LEVEL, 10) === 0) && !res) return null;

  const seperator = '-----------------------------------------------------';
  log(`${seperator}`);
  info(subject);
  if (err) {
    error(err);
  } else {
    info(res);
  }

  return null;
};

module.exports = logResult;
