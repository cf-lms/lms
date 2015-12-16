var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Assignment = require(__dirname + '/../models/assignment.js');

describe('the assignment routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to get all assignments', function(done) {
    chai.request('localhost:3000')
      .get('/api/all-assignments')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });

  it('should be able to create an assignment', function(done) {
    this.testAssignment = {title: 'test', description: 'testing', courseID: 'thisIsAnId'};
    chai.require('localhost:3000')
      .post('/api/assignment')
      .send(this.testAssignment)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.eql('test');
        expect(res.body.description).to.eql('testing');
        expect(res.body.courseID).to.eql('thisIsAnId');
        done();
    });
  });

  describe('routes that need an assignment', function() {

    beforeEach(function(done) {
      this.testAssignment = {title: 'learn C', description: 'the hard way', courseID: 'cCourse'};
      chai.request('localhost:3000')
        .post('/api/assignment')
        .send(this.testAssignment)
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
      }).bind(this);
    });

    it('should return a specific assignment', function(done) {
      chai.request('localhost:3000')
        .get('/api/assignments/' + this.testAssignment._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res[0].title).to.eql('learn C');
          expect(res[0].description).to.eql('the hard way');
          expect(res[0].courseID).to.eql('cCourse');
          done();
      }).bind(this);
    });

    it('should be able to update a assignment', function(done) {
      chai.request('localhost:3000')
        .put('/api/assignments/' + this.testAssignment._id)
        .send({title: 'learn python'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('updated');
          done();
      }).bind(this);
    });

    it('should be able to delete a assignment', function(done) {
      chai.request('localhost:3000')
        .delete('/api/assignments/' + this.testAssignment._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.msg).to.eql('deleted');
          done();
      }).bind(this);
    });
  });
});
