var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var testServer = require('express')();

process.env.CLIENT_ID = '123';
process.env.CLIENT_SECRET = 'abc';
process.env.HOST = 'localhost:5000';
process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
process.env.APP_SECRET = 'helloworld';

require(__dirname + '/../server');
var mongoose = require('mongoose');

describe('The auth routes', function() {
  before(function() {
    testServer.post('/login/oauth/access_token', function(req, res) {
      res.json({access_token: 'success'});
    });
    testServer.get('/user', function(req, res) {
      res.json({login: 'someguy'})
    });
    this.server = testServer.listen(5000);
  }.bind(this));
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    })
    this.server.close(function() {console.log('done again')})
  }.bind(this));
  it('should redirect', function(done) {
    chai.request('localhost:3000')
      .get('/auth')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.redirects.length).to.eql(2);
        done();
      });
  });
  it('should ask for a token', function(done) {
    chai.request('localhost:3000')
      .get('/auth/token?code=thisisnotarealcode')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

