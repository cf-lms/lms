var reducerCombiner = require('redux').reducerCombiner;
var authReducer = require(__dirname + '/auth_reducer');
var assignmentReducer = require(__dirname + '/assignment_reducer');

module.exports = reducerCombiner({
  authReducer: authReducer,
  assignmentReducer: assignmentReducer
});
