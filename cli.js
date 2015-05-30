#!/usr/bin/env node
'use strict';

var nodeApiDocs = require('./');

var helpVersion = require('help-version')(usage()),
    minimist =  require('minimist'),
    builtins = require('builtins');


function usage() {
  return [
    'Usage:  nodeapi [--markdown | --html | --json] <module>',
    '        nodeapi --list'
  ].join('\n');
}


var opts = minimist(process.argv.slice(2), {
  boolean: ['markdown', 'html', 'json', 'list'],
  unknown: function (opt) {
    if (opt[0] == '-') {
      helpVersion.help(1);
    }
  }
});


(function main() {
  var numberOfFormatOptions = opts.markdown + opts.html + opts.json;

  if (opts.list) {
    if (opts._.length != 0 || numberOfFormatOptions > 0) {
      return helpVersion.help(1);
    }
    return console.log(builtins);
  }

  if (opts._.length != 1 || numberOfFormatOptions > 1) {
    return helpVersion.help(1);
  }

  var format = opts.html ? 'html' : opts.json ? 'json' : 'markdown';
  var module = opts._[0];

  nodeApiDocs[format](module)
    .pipe(process.stdout);
}());
