var glob = require('glob');
var fs = require('fs');

var tail = fs.readFileSync(__dirname + '/payload.js');

module.exports = function (options) {
  return function (req, res, next) {
    if (!options.path || req.url === options.path) {
      res.setHeader('Content-Type', 'application/javascript');
      getScripts(options, function (err, files) {
        var data = JSON.stringify(files) + tail;
        res.end(data);
      });
    } else {
      next();
    }
  };
};

var getScripts = module.exports._getScripts = function (options, callback) {
  if (options.glob === undefined) {
    return callback(new Error('option glob is required'));
  }

  glob(options.glob, { cwd: options.cwd }, function (er, files) {
    if (er) { return callback(err); }

    files = files.map(function (filename) {
      return '/' + filename;
    });

    callback(null, files);
  });
};

module.exports._tail = tail;
