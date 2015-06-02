'use strict';

var request = require('request'),
    herror = require('herror');


var docfn = function (urlfn) {
  return function (module) {
    // Our response listener handles HTTP codes, so if bad code arrives
    // no additional response listeners should be fired.
    var responseListeners = [];

    var req = request(urlfn(encodeURIComponent(module)))
      .on('response', function (res) {
        if (res.statusCode != 200) {
          return this.emit('error', herror(res.statusCode));
        }
        responseListeners.forEach(function (listener) {
          listener.call(req, res);
        });
      });

    req.on = function (event, listener) {
      if (event == 'response') {
        responseListeners.push(listener);
      }
      else {
        request.Request.prototype.on.apply(req, arguments);
      }
      return this;
    };

    return req;
  };
};


exports = module.exports = docfn(function (module) {
  return 'https://raw.githubusercontent.com/nodejs/io.js/master/doc/api/' +
    module + '.markdown';
});

exports.markdown = exports;


exports.html = docfn(function (module) {
  return 'https://iojs.org/api/' + module + '.html';
});


exports.json = docfn(function (module) {
  return 'https://iojs.org/api/' + module + '.json';
});
