var combineReducers = require('redux').combineReducers;
var authReducer = require(__dirname + '/auth_reducer');
var assignmentReducer = require(__dirname + '/assignment_reducer');

module.exports = combineReducers({
  authReducer: authReducer,
  assignmentReducer: assignmentReducer
});

