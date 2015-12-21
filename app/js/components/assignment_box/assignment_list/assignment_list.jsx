var React = require('react');
var ReactDOM = require('react-dom');
var Assignment = require(__dirname + '/assignment/assignment.jsx');

module.exports = React.createClass({

  render: function() {
    var handleSubmit = this.props.handleSubmit;
    var updateAssignments = this.props.updateAssignments;
    var context = this.props.context;
    var assignmentNodes = this.props.data.map(function(assignment) {
      return (
        <Assignment key={assignment._id} id={assignment._id} context={context} handleSubmit={handleSubmit} updateAssignments={updateAssignments}>
          {assignment.description}
        </Assignment>
      );
    });

    return (
      <div>
        {assignmentNodes}
      </div>
    );
  }
});
