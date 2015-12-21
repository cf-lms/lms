var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var git = (__dirname + '/../lib/git_util');
var Course = require(__dirname + '/../models/course.js');
var Assignment = require(__dirname + '/../models/assignment.js');

process.env.CLIENT_ID = '123';
process.env.CLIENT_SECRET = 'abc';
process.env.HOST = 'localhost:5000';
process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
process.env.APP_SECRET = 'helloworld';

var git = require(__dirname + '/../lib/git_util');
var server = require(__dirname + '/../server');
var testServer = require(__dirname + '/../lib/test_server');
var mongoose = require('mongoose');

describe('The git routes', function() {
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
  it('should create a course', function(done) {
    chai.request('localhost:3000')
      .post('/git/create/course')
      .set('token', this.token)
      .send({repo: 'dummy', readme: '/course/readme.md'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('assignments');
        expect(res.body).to.have.property('course');
        done();
      });
  });
});

describe('The auth routes', function() {
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
