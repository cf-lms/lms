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

describe('The git routes', function() {
  before(function() {
    testServer.post('/user/repos', function(req, res) {
      res.json({msg: 'bravo'});
    });
    testServer.post('/login/oauth/access_token', function(req, res) {
      res.json({access_token: '123token'});
    });
    testServer.get('/user', function(req, res) {
      res.json({login: 'someguy'});
    });
    testServer.listen(5000);
  });
  before(function(done) {
    chai.request('localhost:3000')
      .get('/auth/token?code=notarealcode')
      .end(function(err, res) {
        this.token = res.body.token;
        done()
      }.bind(this));
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should create a new repo', function(done) {
    chai.request('localhost:3000')
      .post('/git/create/repo')
      .set('token', this.token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('bravo');
        done();
      });
  });
});

