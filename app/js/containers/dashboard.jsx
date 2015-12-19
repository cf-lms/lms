var React = require('react');
var ReactDOM = require('react-dom');
var AssignmentBox = require(__dirname + '/../components/assignment_box/assignment_box.jsx');
var HeaderBox = require(__dirname + '/../components/header_box/header_box.jsx');
var AsideBox = require(__dirname + '/../components/aside_box/aside_box.jsx');

var Dashboard = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderBox handleAuthClick={this.props.actions.handleAuthClick} loggedInStatus={this.props.loggedInStatus} />
        <AsideBox />
        <AssignmentBox expand={true} header='DUE RIGHT FUCKING NOW' assignments={this.props.assignments} />
        <AssignmentBox expand={false} header='DUE FUCKING LAST WEEK' assignments={this.props.assignments} />
        <AssignmentBox expand={false} header='DUE FUCKING LATER' assignments={this.props.assignments} />
      </div>
    );
  }
});

