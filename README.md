[![npm](https://nodei.co/npm/node-api-docs.png)](https://nodei.co/npm/node-api-docs/)

# node-api-docs

[![Build Status](https://travis-ci.org/eush77/node-api-docs.svg?branch=master)](https://travis-ci.org/eush77/node-api-docs) [![Dependency Status][david-badge]][david]

Node API docs in Markdown, HTML, or JSON, as a readable stream.

[david]: https://david-dm.org/eush77/node-api-docs
[david-badge]: https://david-dm.org/eush77/node-api-docs.png

## Example

```js
var apidocs = require('node-api-docs');

apidocs.markdown('net')
  .pipe(process.stdout);
```

## API

### `nodeApiDocs.markdown(module)`

Returns readable stream of Markdown.

### `nodeApiDocs.html(module)`

Returns readable stream of HTML.

### `nodeApiDocs.json(module)`

Returns readable stream of JSON.

### Event: `error`

```js
nodeApiDocs(module).on('error', function(err))
```

Emitted if connection failed, or server responds with code other than 200.

## CLI

### `nodeapi [--markdown | --html | --json] <module>`

Writes docs to stdout, or pipes to pager if stdout is TTY.

### `nodeapi --list`

Prints list of doc pages.

## Install

```
npm install node-api-docs
```

## License

MIT
