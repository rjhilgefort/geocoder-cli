const stream = require('stream');
const { append } = require('../utils');

let buffer = '';

const lineStream = new stream.Transform({
  transform(chunk, encoding, cb) {
    // TODO: Would become too big on VLF given the limiter below
    // Add latest chunk to buffer
    buffer = append(chunk)(buffer);

    // Limit the lines emitted to no more than 50/sec
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

module.exports = lineStream;
