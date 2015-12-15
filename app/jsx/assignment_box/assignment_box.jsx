var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentHeader = require(__dirname + '/assignment_header/assignment_header.jsx');
var AssignmentList = require(__dirname + '/assignment_list/assignment_list.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {data: [{title: 'some assignment', dueDate: 'yesterday'}, {title: 'some other assignment', dueDate: 'today'}], header: 'TO DO RIGHT FUCKING NOW!'};
  },

  render: function() {
    return (
      <article>
        <AssignmentHeader header={this.state.header} />
        <AssignmentList data={this.state.data} />
      </article>
    );
  }
});
