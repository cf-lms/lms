var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentHeader = require(__dirname + '/assignment_header/assignment_header.jsx');
var AssignmentList = require(__dirname + '/assignment_list/assignment_list.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {data: [{title: 'some assignment', dueDate: 'yesterday'}, {title: 'some other assignment', dueDate: 'today'}], expand: false};
  },

  handleExpandClick: function() {
    this.setState({expand: !this.state.expand});
  },

  render: function() {
    return (
      <article>
        <AssignmentHeader onExpandClick={this.handleExpandClick} header={this.props.header} expand={this.state.expand} />
        {this.state.expand ? <AssignmentList data={this.state.data} /> : null }
      </article>
    );
  }
});
