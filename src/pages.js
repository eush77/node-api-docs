'use strict';

var request = require('request'),
    herror = require('herror');


module.exports = function (cb) {
  request({
    url: 'https://iojs.org/api/index.json',
    json: true
  },  function(err, res, body) {
    if (err) return cb(err);

    if (res.statusCode != 200) {
      return cb(herror(res.statusCode));
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
