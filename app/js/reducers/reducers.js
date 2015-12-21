var combineReducers = require('redux').combineReducers;
var authReducer = require(__dirname + '/auth_reducer');
var assignmentReducer = require(__dirname + '/assignment_reducer');
var courseReducer = require(__dirname + '/course_reducer');
var viewReducer = require(__dirname + '/view_reducer');

module.exports = combineReducers({
  authReducer: authReducer,
  assignmentReducer: assignmentReducer,
  courseReducer: courseReducer,
  viewReducer: viewReducer
});

