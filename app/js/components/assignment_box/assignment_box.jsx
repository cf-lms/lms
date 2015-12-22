var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentHeader = require(__dirname + '/assignment_header/assignment_header.jsx');
var AssignmentList = require(__dirname + '/assignment_list/assignment_list.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <article className={this.props.className}>
        <AssignmentHeader {...this.props} onExpandClick={this.props.handleExpandClick} />
        {this.props.expand ? <AssignmentList { ...this.props} /> : null}
      </article>
    );
  }
});
