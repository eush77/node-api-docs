'use strict';

var debug = require('debug')('node-api-docs'),
    got = require('got');


var docfn = function (urlfn) {
  return function (module) {
    var url = urlfn(encodeURIComponent(module));
    debug(url);
    return got.stream(url);
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
