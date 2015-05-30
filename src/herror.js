'use strict';

var http = require('http');


module.exports = function (code) {
  var error = new Error(code + ' ' + http.STATUS_CODES[code]);
  error.code = code;
  return error;
};
