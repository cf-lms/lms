var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user.js');

describe('the user routes', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    var testUser = {username: 'toasty', admin: true, courseID: 'bearSchool'};
    chai.request('localhost:3000')
      .post('/api/signup')
      .send(testUser)
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
      (new User({username: 'test name', courseID: 'all the courses'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.user = data;
        done();
      }.bind(this));
    });

    it('should be able to update a user', function(done) {
      chai.request('localhost:3000')
        .put('/api/users/' + this.user._id)
        .send({username: 'a new test user'})
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text.msg).to.eql('updated');
          done();
      }.bind(this));
    });

    it('should be able to delete a course', function(done) {
      chai.request('localhost:3000')
        .delete('/api/users/' + this.user._id)
        .end(function(err, res) {
          res.text = JSON.parse(res.text);
          expect(err).to.eql(null);
          expect(res.text.msg).to.eql('deleted');
          done();
      }.bind(this));
    });
  });
});
