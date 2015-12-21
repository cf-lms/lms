var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/../components/assignment_box/assignment_box.jsx');
var HeaderBox = require(__dirname + '/../components/header_box/header_box.jsx');
var AsideBox = require(__dirname + '/../components/aside_box/aside_box.jsx');

var Dashboard = module.exports = React.createClass({

  componentDidMount: function() {
    this.props.assignmentActions.fetchAssignments(this.props.assignmentActions.receiveAssignments);
    console.log('look ma: ' + document.cookie);
    if (this.props.path) {
      this.props.actions.getToken(this.props.path);
      this.props.authActions.changeLoggedInStatus(getState().loggedInStatus);
    }
  },

  render: function() {
    var auth = this.props.auth;
    var authActions = this.props.authActions;
    var assignments = this.props.assignments;
    var assignmentActions = this.props.assignmentActions;

    return (
      <div>
        <HeaderBox {...auth} />
        <AsideBox />
        <AssignmentBox { ...assignments[0]} handleExpandClick={assignmentActions.handleExpandClick} />
        <AssignmentBox { ...assignments[1]} handleExpandClick={assignmentActions.handleExpandClick} />
        <AssignmentBox { ...assignments[2]} handleExpandClick={assignmentActions.handleExpandClick} />
      </div>
    );
  }
});

