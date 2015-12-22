var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/../components/assignment_box/assignment_box.jsx');

var Dashboard = module.exports = React.createClass({

  componentDidMount: function() {
    this.props.assignmentActions.fetchAssignments(this.props.assignmentActions.sortAssignments, this.props.assignmentActions.receiveAssignments);
  },

  render: function() {
    var assignments = this.props.assignments;
    var assignmentActions = this.props.assignmentActions;

    return (
      <div>
        <AssignmentBox { ...assignments[1]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[2]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[0]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
        <AssignmentBox { ...assignments[3]} handleExpandClick={assignmentActions.handleExpandClick} handleSubmit={assignmentActions.handleSubmit} updateAssignments={assignmentActions.updateAssignments} />
      </div>
    );
  }
});

