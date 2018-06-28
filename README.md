# purs

[![npm version](https://img.shields.io/npm/v/purs.svg)](https://www.npmjs.com/package/purs)
[![Build Status](https://travis-ci.com/shinnn/purs.svg?branch=master)](https://travis-ci.com/shinnn/purs)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/purs.svg)](https://coveralls.io/github/shinnn/purs?branch=master)

[Spawn] a new process using [PureScript](https://github.com/purescript/purescript) CLI

```javascript
const {readFile} = require('purs').promises;
const purs = require('purs');

(async () => {
  await purs.compile(['source.purs', '--output', 'out']);
  await readFile('out/Main/index.js', 'utf8'); //=> '// Generated by purs ...'
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install purs
```

Since this package contains [`purescript` npm package](https://github.com/purescript-contrib/node-purescript) in its dependency list and uses it when spawning a new process, there is no need to install [PureScript](https://github.com/purescript/purescript) separately.

## API

```javascript
const purs = require('purs');
```

### purs.help([*options*]), purs.version([*options*])

*options*: `Object` ([`execa` options](https://github.com/sindresorhus/execa#options))  
Return: `Promise<string>`

Spawn a new `purs --help` or `purs --version` process and return a `Promise` of the command stdout as a string.

```javascript
(async () => {
  await purs.help(); //=> 'Usage: purs.bin COMMAND\n  The PureScript compiler ...'
})();
```

### purs.bundle([*args*][, *options*]), purs.compile([*args*][, *options*]), purs.docs([*args*][, *options*]), purs.hierarchy([*args*][, *options*]), purs.ide([*args*][, *options*]), purs.publish([*args*][, *options*])

*args*: `Array<string>` (additional command-line arguments)  
*options*: `Object` (`execa` options)  
Return: [`ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess) with additional [`execa`](https://github.com/sindresorhus/execa)-specific enhancement

Spawn a new process with a `purs` subcommand corresponding to the method name and return a  [`execa` return value](https://github.com/sindresorhus/execa#execafile-arguments-options):

> a `child_process` instance, which is enhanced to also be a `Promise` for a result `Object` with `stdout` and `stderr` properties.

```javascript
(async () => {
  const result = await purs.bundle(['index.js', '--output', 'app.js']);
  /*=> {
    stdout: '',
    stderr: '',
    code: 0,
    failed: false,
    killed: false,
    signal: null,
    cmd: '/Users/example/node_modules/purescript/purs.bin bundle index.js --output app.js',
    timedOut: false
  } */
})();
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe

[Spawn]: https://en.wikipedia.org/wiki/Spawn_(computing)