'use strict';

var request = require('request');


exports.markdown = function (module) {
  return request('https://raw.githubusercontent.com/nodejs/io.js/master/doc/api/' +
                 module + '.markdown');
};


exports.html = function (module) {
  return request('https://iojs.org/api/' + module + '.html');
};


exports.json = function (module) {
  return request('https://iojs.org/api/' + module + '.json');
};
