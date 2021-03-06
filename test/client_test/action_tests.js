var expect = require('chai').expect;
var assignmentActions = require(__dirname + '/../../app/js/actions/assignment_actions.js');
var authActions = require(__dirname + '/../../app/js/actions/auth_actions.js');
var types = require(__dirname + '/../../app/js/constants/action_types.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/lms_test';
require(__dirname + '/../../server.js');
var mongoose = require('mongoose');

describe('the assignment actions', function() {

  it('should change the boolean value of expand', function() {

    var expectedOutput = {
      type: types.HANDLE_EXPAND_CLICK,
      expand: false,
      context: 'current'
    };

    expect(assignmentActions.handleExpandClick(true, 'current')).to.eql(expectedOutput);
  });

  it('should return an object with the type title', function() {
    var expectedOutput = {
      type: types.RECEIVE_ASSIGNMENTS,
      upcoming: 'testing',
      current: 'test',
      late: 'testy',
      turnedIn: 'testify'
    };
    expect(assignmentActions.receiveAssignments('testing', 'test', 'testy', 'testify')).to.eql(expectedOutput);
  });

  it('should return a function invocation when calling sort assignments', function() {
    var callback = function() {
      return 'testing123';
    };

    expect(assignmentActions.sortAssignments([], callback)).to.eql('testing123');
  });

  describe('test that needs a DB', function() {

    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });

    it('should get request from the DB and call a funciton', function() {
      var callback = function() {};
      expect(assignmentActions.fetchAssignments(callback))
      .to.be.a('function');
    });
  });
});

describe('the auth actions', function() {

  it('should check logged in status', function() {

    expectedOutput = {
      type: types.CHANGE_LOGGED_IN_STATUS,
      loggedInStatus: true
    };

    expect(authActions.changeLoggedInStatus(false)).to.eql(expectedOutput);
  });
});
