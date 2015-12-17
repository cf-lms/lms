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
    var testAssignment = {type: 'test', description: 'testing', courseID: 'thisIsAnId'};
    chai.request('localhost:3000')
      .post('/api/assignments')
      .send(testAssignment)
      .end(function(err, res) {
        res.text = JSON.parse(res.text);
        expect(err).to.eql(null);
        expect(res.text).to.have.property('_id');
        expect(res.text.type).to.eql('test');
        expect(res.text.description).to.eql('testing');
        expect(res.text.courseID).to.eql('thisIsAnId');
        done();
    });
  });

  describe('routes that need an assignment', function() {

    beforeEach(function(done) {
      (new Assignment({type: 'read', description: 'learn c the hard way', courseID: 'cCourse'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.assignment = data;
        done();
      }.bind(this));
    });

    it('should be able to update an assignment', function(done) {
      chai.request('localhost:3000')
        .put('/api/assignments/' + this.assignment._id)
        .send({type: 'code'})
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text.msg).to.eql('updated');
          done();
      }.bind(this));
    });

    it('should be able to delete an assignment', function(done) {
      chai.request('localhost:3000')
        .delete('/api/assignments/' + this.assignment._id)
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text.msg).to.eql('deleted');
          done();
      }.bind(this));
    });
  });
});
