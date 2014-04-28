
# connect-scriptloader

A script concatenation middleware for connect, useful for developing js that will be concatenation in production.

## Usage

```
var express = require('express');
var connectScriptloader = require('connect-scriptloader');

var app = express();

# connect style
app.use(connectScriptloader({
  cwd: 'app/js',
  glob: '**/*.js',
  path: '/app.js'
}));

# or using express router
app.get('/app2.js', connectScriptloader({
  cwd: 'app/js',
  glob: '**/*.js',
}));
```
