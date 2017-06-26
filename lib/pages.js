'use strict';

var debug = require('debug')('node-api-docs'),
    got = require('got'),
    herror = require('herror');


module.exports = function (cb) {
  var url = 'https://nodejs.org/api/index.json',
      re = /\((.*)\.html\)/;

  debug(url);

  got(url, { json: true, followRedirect : true }, function(err, body, res) {
    if (res && res.statusCode != 200) {
      return cb(herror(res.statusCode));
    }
    else if (err) {
      return cb(err);
    }


    cb(null, body.desc
       .filter(function (item) {
         return item.type == 'text' && item.text.match(re);
       })
       .map(function (item) {
         return item.text.match(re)[1];
       }));
  });
};
