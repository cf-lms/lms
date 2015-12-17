var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var testServer = require('express')();

process.env.CLIENT_ID = '123';
process.env.CLIENT_SECRET = 'abc';
process.env.ROUTE = 'localhost:5000/test-token';
require(__dirname + '/../server');

describe('The auth routes', function() {
  before(function() {
    testServer.post('/test-token', function(req, res) {
      res.json({access_token: 'success'});
    });
    testServer.listen(5000);
  });
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
        expect(res.body.token).to.eql('success');
        done();
      });
  });
});

