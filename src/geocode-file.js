const stream = require('stream');
const fs = require('fs');
const path = require('path');
const { append } = require('./utils');
const { geocodeLine, logResult } = require('./lib');

let buffer = '';
const BufferStream = new stream.Transform({
  transform(chunk, encoding, cb) {
    // TODO: Would become too big on VLF given the limiter below
    // Add latest chunk to buffer
    buffer = append(chunk)(buffer);

    const rateLimit = setInterval(() => {
      // Stop checking for data when buffer is empty after check added
      // TODO: Doesn't handle empty lines at EOF or any case where
      //       stream doesn't end with `\n`
      if (buffer.length === 0) {
        clearInterval(rateLimit);
        return cb();
      }

      // Look for a complete line to emit
      const delimeterIndex = buffer.indexOf('\n');

      // Don't emit anything if a complete line cannot be found
      if (delimeterIndex === -1) return null;

      // Emit a complete line
      this.push(buffer.slice(0, delimeterIndex));

      // Slice emitted line off buffer
      buffer = buffer.slice(delimeterIndex + 1);

      return null;
    }, 1000 / 50);
  }
});

let lineNumber = 0;
// TODO: Not doing anything with this yet, just dumping to console
const rooftopQualityAddresses = [];
const GeocodeStream = new stream.Transform({
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
        return logResult(line)(null, 'Rooftop quality address identified, pushed');
      });
    }

    return cb();
  }
});

// geocodeFile :: String -> STDOUT
const geocodeFile = file =>
  fs.createReadStream(path.join(__dirname, file))
    .pipe(BufferStream)
    .pipe(GeocodeStream);

module.exports = geocodeFile;
