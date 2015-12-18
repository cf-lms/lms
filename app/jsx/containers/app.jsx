var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var AssignmentBox = require(__dirname + '/../components/assignment_box/assignment_box.jsx');
var bindActionCreators = require('redux').bindActionCreators;
var assignmentsActions = require(__dirname + '/../actions/assignments_actions');

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <AssignmentBox expand={true} header='DUE RIGHT FUCKING NOW' assignments={this.props.assignments} />
        <AssignmentBox expand={false} header='DUE FUCKING LAST WEEK' assignments={this.props.assignments} />
        <AssignmentBox expand={false} header='DUE FUCKING LATER' assignments={this.props.assignments} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return { assignments: state.assignments };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(assignmentsActions, dispatch);
};

var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

module.exports = App;
