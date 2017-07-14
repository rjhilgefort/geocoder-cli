const https = require('https');

// TODO: Curry
// request :: Obejct, Function -> void
const request = (options, cb) => {
  https.request(
    options,
    (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (data) => { body += data; });
      res.on('end', () => {
        try {
          body = JSON.parse(body);
        } catch (err) {
          return cb(err);
        }
        return cb(null, body);
      });
    })
    .on('error', (err) => cb(err))
    .end();
};

module.exports = request;
