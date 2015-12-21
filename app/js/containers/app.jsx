var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;
var authActions = require(__dirname + '/../actions/auth_actions');
var assignmentActions = require(__dirname + '/../actions/assignment_actions');
var Dashboard = require(__dirname + '/dashboard.jsx');

function mapStateToProps(state) {
  return {
    assignments: state.assignmentReducer,
    auth: state.authReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    assignmentActions: bindActionCreators(assignmentActions, dispatch)
  };
}

var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

module.exports = App;
