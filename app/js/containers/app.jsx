var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;
var assignmentsActions = require(__dirname + '/../actions/assignments_actions');
var Dashboard = require(__dirname + '/dashboard.jsx');

function mapStateToProps(state) {
  return { assignments: state.assignments };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(assignmentsActions, dispatch);
};

var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

module.exports = App;
