var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var testServer = require(__dirname + '/../lib/test_server');

process.env.CLIENT_ID = '123';
process.env.CLIENT_SECRET = 'abc';
process.env.HOST = 'localhost:5000';
process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
process.env.APP_SECRET = 'helloworld';

var mongoose = require('mongoose');

describe('The auth routes', function() {
  before(function() {
    this.server = require(__dirname + '/../server');
  }.bind(this));
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    })
    this.server.close();
    testServer.close(function() {console.log('done again')})
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
  describe('The git routes', function() {
   before(function(done) {
    chai.request('localhost:3000')
      .get('/auth/token?code=notarealcode')
      .end(function(err, res) {
        this.token = res.body.token;
        done()
      }.bind(this));
  });
   
    it('should create a course', function(done) {
      chai.request('localhost:3000')
        .post('/git/create/course')
        .set('token', this.token)
        .send({repo: 'dummy', readme: '/course/readme.md'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('assignments')
          done();
        });
    });
  });
});

