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
    var testCourse = {name: 'test', description: 'testing', weeks: []};
    chai.request('localhost:3000')
      .post('/api/courses')
      .send(testCourse)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql('test');
        expect(res.body.description).to.eql('testing');
        expect(Array.isArray(res.body.weeks)).to.eql(true);
        done();
    });
  });
});

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
  var testAssignment = {name: 'test', description: 'testing', courseID: 'thisIsAnId'};
  chai.request('localhost:3000')
    .post('/api/assignments')
    .send(testAssignment)
    .end(function(err, res) {
      res.text = JSON.parse(res.text);
      expect(err).to.eql(null);
      expect(res.text).to.have.property('_id');
      expect(res.text.name).to.eql('test');
      expect(res.text.description).to.eql('testing');
      expect(res.text.courseID).to.eql('thisIsAnId');
      done();
  });
});

  describe('routes that need an assignment', function() {

    beforeEach(function(done) {
      (new Assignment({type: 'read', name: 'learn c the hard way', courseID: 'cCourse'})).save(function(err, data) {
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

describe('routes that need a course', function() {

  beforeEach(function(done) {
    (new Course({title: 'java', name: 'short of javascript', weeks: []})).save(function(err, data) {
      expect(err).to.eql(null);
      this.course = data;
      done();
    }.bind(this));
  });

  it('should be able to update a course', function(done) {
    chai.request('localhost:3000')
      .put('/api/courses/' + this.course._id)
      .send({title: 'js'})
      .end(function(err, res) {
        res.text = JSON.parse(res.text);
        expect(err).to.eql(null);
        expect(res.text.msg).to.eql('updated');
        done();
    }.bind(this));
  });

  it('should be able to delete a course', function(done) {
    chai.request('localhost:3000')
      .delete('/api/courses/' + this.course._id)
      .end(function(err, res) {
        res.text = JSON.parse(res.text);
        expect(err).to.eql(null);
        expect(res.text.msg).to.eql('deleted');
        done();
    }.bind(this));
  });
});
describe('the git functions', function() {
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


