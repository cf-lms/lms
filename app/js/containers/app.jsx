var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;
var authActions = require(__dirname + '/../actions/auth_actions');
var Dashboard = require(__dirname + '/dashboard.jsx');

function mapStateToProps(state) {
  console.log(state);
  return {
    assignments: state.assignmentReducer,
    handleAuthClick: state.handleAuthClick,
    loggedInStatus: state.authReducer[0].loggedInStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

module.exports = App;
