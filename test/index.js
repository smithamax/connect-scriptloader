var request = require('supertest');
var should = require('should');
var express = require('express');
var connectScriptloader = require('./..');


describe('with path', function(){
  var app = express();

  app.use(connectScriptloader({
    cwd: 'app',
    glob: '**/*.js',
    path: '/app.js'
  }));

  it('should return when url matches', function(done){
    request(app)
    .get('/app.js')
    .expect('Content-Type', /javascript/)
    .expect(200, done);

  });

  it('skip when url doesn\'t match', function(done){
    request(app)
    .get('/something.js')
    .expect(404, done);
  });
});

describe('without path (using express router)', function(){
  var app = express();

  app.get('/app2.js', connectScriptloader({
    cwd: 'app',
    glob: '**/*.js',
  }));

  it('should return when url matches', function(done){
    request(app)
    .get('/app2.js')
    .expect('Content-Type', /javascript/)
    .expect(200, done);

  });

  it('skip when url doesn\'t match', function(done){
    request(app)
    .get('/app1.js')
    .expect(404, done);
  });
});