'use strict';

var nodeApiDocs = require('..');

var test = require('tape'),
    devnull = require('dev-null'),
    concat = require('concat-stream'),
    isHtml = require('is-html');


test('markdown', function (t) {
  t.plan(3);
  t.equal(nodeApiDocs, nodeApiDocs.markdown, 'should be the default');

  nodeApiDocs('child_process')
    .on('end', function () {
      t.pass('should succeed on built-in module');
    })
    .pipe(devnull());

  nodeApiDocs('node-api-docs')
    .on('error', function () {
      t.pass('should fail on userland module');
    })
    .pipe(devnull());
});


test('html', function (t) {
  t.plan(3);

  nodeApiDocs.html('child_process')
    .on('end', function () {
      t.pass('should succeed on built-in module');
    })
    .pipe(concat({ encoding: 'string' }, function (body) {
      t.ok(isHtml(body), 'should get valid HTML');
    }));

  nodeApiDocs.html('node-api-docs')
    .on('error', function () {
      t.pass('should fail on userland module');
    })
    .pipe(devnull());
});


test('json', function (t) {
  t.plan(3);

  nodeApiDocs.json('child_process')
    .on('end', function () {
      t.pass('should succeed on built-in module');
    })
    .pipe(concat({ encoding: 'string' }, function (body) {
      JSON.parse(body);
      t.pass('should get valid JSON');
    }));

  nodeApiDocs.json('node-api-docs')
    .on('error', function () {
      t.pass('should fail on userland module');
    })
    .pipe(devnull());
});
