'use strict';

var request = require('request'),
    builtins = require('builtins');


var checkIsBuiltin = function (module) {
  if (builtins.indexOf(module) < 0) {
    throw new Error('No built-in module \'' + module + '\'');
  }
};


var docfn = function (urlfn) {
  return function (module) {
    checkIsBuiltin(module);
    return request(urlfn(module));
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
