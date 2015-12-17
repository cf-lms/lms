var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('The auth routes', function() {
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
        expect(res.body.error).to.eql('bad_verification_code');
        done();
      });
  });
});

