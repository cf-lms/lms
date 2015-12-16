var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Course = require(__dirname + '/../models/course.js');

describe('the course routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    this.testUser = {username: 'toasty', admin: true, courseID: 'bearSchool'};
    chai.require('localhost:3000')
      .post('/api/users')
      .send(this.testUser)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.username).to.eql('toasty');
        expect(res.body.admin).to.eql(true);
        expect(res.body.courseID).to.eql('bearSchool');
        done();
    });
  });

  describe('routes that need a user', function() {

    beforeEach(function(done) {
      this.testUser = {username: 'test user', admin: false, courseID: 'test course'};
      chai.request('localhost:3000')
        .post('/api/courses')
        .send(this.testUser)
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
      }).bind(this);
    });

    it('should be able to update a user', function(done) {
      chai.request('localhost:3000')
        .put('/api/users/' + this.testUser._id)
        .send({username: 'a new test user'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('updated');
          done();
      }).bind(this);
    });

    it('should be able to delete a course', function(done) {
      chai.request('localhost:3000')
        .delete('/api/userss/' + this.testUsers._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('deleted');
          done();
      }).bind(this);
    });
  });
});
