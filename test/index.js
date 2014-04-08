var request = require('supertest');
var should = require('should');
var express = require('express');
var connectScriptloader = require('./..');


describe('with path', function(){
  var app = express();

  app.use(connectScriptloader({
    cwd: 'test/fake-scripts',
    glob: '**/*.js',
    path: '/app.js'
  }));

  it('should return when url matches', function(done){
    request(app)
    .get('/app.js')
    .expect('Content-Type', /javascript/)
    .expect('["/app.js"]' + connectScriptloader._tail)
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
    cwd: 'test/fake-scripts',
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

describe('getScripts', function(){
  it('should get list of files matching glob', function(done){

    connectScriptloader._getScripts(
      {
        cwd: 'test/fake-scripts',
        glob: '**/*.js',
      },
      function (err, files) {
        files.should.have.lengthOf(1);
        files[0].should.eql('/app.js');
        done(err);
      }
    );

  });

  it('should return error if no glob specified', function(done){

    connectScriptloader._getScripts(
      {},
      function (err, files) {
        err.message.should.eql('option glob is required');
        done();
      }
    );

  });
});
