'use strict';

const packageA = require('../build');
const assert = require('assert').strict;

assert.strictEqual(packageA(), 'Hello from packageA');
console.info('packageA tests passed');
