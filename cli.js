#!/usr/bin/env node
'use strict';

var nodeApiDocs = require('./');

var helpVersion = require('help-version')(usage()),
    minimist =  require('minimist');


function usage() {
  return 'Usage:  nodeapi [--markdown | --html | --json] <module>';
}


var opts = minimist(process.argv.slice(2), {
  boolean: ['markdown', 'html', 'json'],
  unknown: function (opt) {
    if (opt[0] == '-') {
      helpVersion.help(1);
    }
  }
});


(function main() {
  if (opts._.length != 1 || opts.markdown + opts.html + opts.json > 1) {
    return helpVersion.help(1);
  }

  var format = opts.html ? 'html' : opts.json ? 'json' : 'markdown';
  var module = opts._[0];

  nodeApiDocs[format](module)
    .pipe(process.stdout);
}());
