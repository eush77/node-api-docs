'use strict';

var request = require('request');

var http = require('http');


module.exports = function (cb) {
  request({
    url: 'https://iojs.org/api/index.json',
    json: true
  },  function(err, res, body) {
    if (err) return cb(err);

    if (res.statusCode != 200) {
      var message = res.statusCode + ' ' + http.STATUS_CODES[res.statusCode];
      return cb(new Error(message));
    }

    var pages = body.desc
          .filter(function (item) {
            return item.type == 'text';
          })
          .map(function (item) {
            return item.text.match(/\((.*)\.html\)/)[1];
          });

    cb(null, pages);
  });
};
