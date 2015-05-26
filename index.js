'use strict';

var request = require('request');


exports.markdown = function (module) {
  return request('https://raw.githubusercontent.com/nodejs/io.js/master/doc/api/' +
                 module + '.markdown');
};
