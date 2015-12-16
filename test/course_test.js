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

  it('should be able to get all courses', function(done) {
    chai.request('localhost:3000')
      .get('/api/all-courses')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });

  it('should be able to create a course', function(done) {
    this.testCourse = {title: 'test', description: 'testing', weeks: []};
    chai.require('localhost:3000')
      .post('/api/courses')
      .send(this.testCourse)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.eql('test');
        expect(res.body.description).to.eql('testing');
        expect(Array.isArray(res.body.weeks)).to.eql(true);
        done();
    });
  });

  describe('routes that need a course', function() {

    beforeEach(function(done) {
      this.testCourse = {title: 'java', description: 'short of javascript', weeks: []};
      chai.request('localhost:3000')
        .post('/api/courses')
        .send(this.testCourse)
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
      }).bind(this);
    });

    it('should return a specific course', function(done) {
      chai.request('localhost:3000')
        .get('/api/courses/' + this.testCourse._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.title).to.eql('java');
          expect(res.description).to.eql('short for javascript');
          expect(Array.isArray(res.weeks)).to.eql(true);
          done();
      }).bind(this);
    });

    it('should be able to update a course', function(done) {
      chai.request('localhost:3000')
        .put('/api/courses/' + this.testCourse._id)
        .send({title: 'js'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('updated');
          done();
      }).bind(this);
    });

    it('should be able to delete a course', function(done) {
      chai.request('localhost:3000')
        .delete('/api/courses/' + this.testCourse._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('deleted');
          done();
      }).bind(this);
    });
  });
});
