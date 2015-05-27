'use strict';

var request = require('request'),
    builtins = require('builtins');


var checkIsBuiltin = function (module) {
  if (builtins.indexOf(module) < 0) {
    throw new Error('No built-in module \'' + module + '\'');
  }
};


exports.markdown = function (module) {
  checkIsBuiltin(module);
  return request('https://raw.githubusercontent.com/nodejs/io.js/master/doc/api/' +
                 module + '.markdown');
};


exports.html = function (module) {
  checkIsBuiltin(module);
  return request('https://iojs.org/api/' + module + '.html');
};


exports.json = function (module) {
  checkIsBuiltin(module);
  return request('https://iojs.org/api/' + module + '.json');
};
