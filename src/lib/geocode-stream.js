const stream = require('stream');
const logResult = require('./log-result');
const geocodeLine = require('./geocode-line.js');

let lineNumber = 0;
// TODO: Not doing anything with this yet, just dumping to console
const rooftopQualityAddresses = [];

const geocodeStream = new stream.Transform({
  transform(chunk, encoding, cb) {
    const line = chunk.toString();
    lineNumber += 1;

    // Skipe the CSV header, but geocode all other lines
    if (lineNumber === 1) {
      logResult(line)('Skipping CSV Header');
    } else {
      geocodeLine(line)((err, res) => {
        if (err) return logResult(line)(err);

        // Only care about a single non-partial result
        if (res.results.length !== 1) {
          return logResult(line)('No geocode results for address');
        }

        const rooftopRes = res.results.find(
          (addressRes) => addressRes.geometry.location_type === 'ROOFTOP'
        );

        if (!rooftopRes) {
          return logResult(line)('No rooftop hits for address');
        }

        rooftopQualityAddresses.push({
          line,
          geocoding: rooftopRes
        });
        return logResult(line)(null, 'Rooftop quality address identified');
      });
    }

    return cb();
  }
});

module.exports = geocodeStream;
