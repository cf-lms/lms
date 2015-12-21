var expect = require('chai').expect;
var git = require(__dirname + '/../lib/git_util');

process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';

var mongoose = require('mongoose');

describe('the git functions', function() {
  before(function() {
    mongoose.connect(process.env.MONGOLAB_URI);
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should save a course', function(done) {
    git.saveCourse({name: 'Test Course', description: 'Test Description'}, function(err, course) {
      expect(err).to.eql(null);
      expect(course).to.have.property('_id');
      done();
    });
  });
  it('should save an asignment', function(done) {
    git.saveAssignment({name: 'Test Assignment', type: 'test', courseId: '123'}, function(err, assignment) {
      expect(err).to.eql(null);
      expect(assignment).to.have.property('_id');
      done();
    });
  });
});

