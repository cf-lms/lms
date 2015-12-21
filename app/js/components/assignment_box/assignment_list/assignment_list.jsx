var React = require('react');
var ReactDOM = require('react-dom');
var Assignment = require(__dirname + '/assignment/assignment.jsx');

module.exports = React.createClass({

  render: function() {
    var assignmentNodes = this.props.data.map(function(assignment) {
      return (
        <Assignment key={assignment._id}>
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
