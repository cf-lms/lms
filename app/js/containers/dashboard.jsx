var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/../components/assignment_box/assignment_box.jsx');

var Dashboard = module.exports = React.createClass({

  componentDidMount: function() {
    this.props.assignmentActions.fetchAssignments(this.props.assignmentActions.sortAssignments, this.props.assignmentActions.receiveAssignments);
    if (this.props.path) {
      this.props.authActions.getToken(this.props.path);
      this.props.authActions.changeLoggedInStatus(getState().loggedInStatus);
    }
  },

  render: function() {
    var assignments = this.props.assignments;
    var assignmentActions = this.props.assignmentActions;

    return (
      <div className="assignments">
        <AssignmentBox { ...assignments[1]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[2]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[0]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[3]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
      </div>
    );
  }
});

