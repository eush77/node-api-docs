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


exports.markdown = docfn(function (module) {
  return 'https://raw.githubusercontent.com/nodejs/node/master/doc/api/' +
    module + '.md';
});


exports.html = docfn(function (module) {
  return 'https://nodejs.org/api/' + module + '.html';
});


exports.json = docfn(function (module) {
  return 'https://nodejs.org/api/' + module + '.json';
});
