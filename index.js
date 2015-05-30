'use strict';

var herror = require('./src/herror');

var request = require('request');


var docfn = function (urlfn) {
  return function (module) {
    return request(urlfn(encodeURIComponent(module)))
      .on('response', function (res) {
        if (res.statusCode != 200) {
          this.emit('error', herror(res.statusCode));
        }
      });
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
