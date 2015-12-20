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

var server = require(__dirname + '/../server');
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
      server.close();
      done();
    });
    testServer.close(function() {console.log('done')});
  }.bind(this));
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

