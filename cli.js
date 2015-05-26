#!/usr/bin/env node
'use strict';

var nodeApiDocs = require('./'),
    helpVersion = require('help-version')(usage());


function usage() {
  return 'Usage:  nodeapi <module>';
}


(function main(argv) {
  if (argv.length != 1) {
    return helpVersion.help(1);
  }

  nodeApiDocs.markdown(argv[0])
    .pipe(process.stdout);
}(process.argv.slice(2)));
