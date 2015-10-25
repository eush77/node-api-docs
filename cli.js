#!/usr/bin/env node
'use strict';

var nodeApiDocs = require('./'),
    pages = require('./lib/pages');

var helpVersion = require('help-version')(usage()),
    minimist =  require('minimist'),
    pager = require('default-pager');


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
    return pages(function (err, pages) {
      if (err) return console.error(err.message);
      console.log(pages);
    });
  }

  if (opts._.length != 1 || numberOfFormatOptions > 1) {
    return helpVersion.help(1);
  }

  var format = opts.html ? 'html' : opts.json ? 'json' : 'markdown';
  var module = opts._[0];

  var req;
  (req = nodeApiDocs[format](module))
    .on('error', function (err) {
      console.error(err.message);
    })
    .on('response', function (res) {
      req.pipe(process.stdout.isTTY ? pager() : process.stdout);
    });
}());
