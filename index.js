var glob = require('glob');
var fs = require('fs');

var tail = fs.readFileSync(__dirname + '/payload.js');

module.exports = function (options) {
  return function (req, res, next) {
    if (!options.path || req.url === options.path) {
      res.setHeader('Content-Type', 'application/javascript');

      glob(options.glob, { cwd: options.cwd }, function (er, files) {
        files = files.map(function (filename) {
          return '/' + filename;
        });
        var data = JSON.stringify(files) + tail;
        res.end(data);
      });
    } else {
      next();
    }
  };
};
