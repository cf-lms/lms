var React = require('react');
var ReactDOM = require('react-dom');
var Assignment = require(__dirname + '/assignment/assignment.jsx');

module.exports = React.createClass({

  render: function() {
    var assignmentNodes = this.props.data.map(function(assignment) {
      return (
        <Assignment due={assignment.dueDate} key={assignment.dueDate}>
          {assignment.title}
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
