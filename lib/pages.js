'use strict';

var got = require('got'),
    herror = require('herror');


module.exports = function (cb) {
  got('https://iojs.org/api/index.json', { json: true }, function(err, body, res) {
    if (res && res.statusCode != 200) {
      return cb(herror(res.statusCode));
    }
    else if (err) {
      return cb(err);
    }

    cb(null, body.desc
       .filter(function (item) {
         return item.type == 'text';
       })
       .map(function (item) {
         return item.text.match(/\((.*)\.html\)/)[1];
       }));
  });
};
