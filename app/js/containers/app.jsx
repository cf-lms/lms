var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var bindActionCreators = require('redux').bindActionCreators;
var authActions = require(__dirname + '/../actions/auth_actions');
var assignmentActions = require(__dirname + '/../actions/assignment_actions');
var courseActions = require(__dirname + '/../actions/course_actions');
var viewActions = require(__dirname + '/../actions/view_actions');

var HeaderBox = require(__dirname + '/../components/header_box/header_box.jsx');
var Dashboard = require(__dirname + '/dashboard.jsx');
var CourseCreator = require(__dirname + '/course_creator.jsx');
var AsideBox = require(__dirname + '/../components/aside_box/aside_box.jsx');

function mapStateToProps(state) {
  return {
    assignments: state.assignmentReducer,
    auth: state.authReducer,
    course: state.courseReducer,
    view: state.viewReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    assignmentActions: bindActionCreators(assignmentActions, dispatch),
    courseActions: bindActionCreators(courseActions, dispatch),
    viewActions: bindActionCreators(viewActions, dispatch)
  };
}

var App = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderBox
          handleAuthClick={this.props.handleAuthClick}
          loggedInStatus={this.props.loggedInStatus} />
        <AsideBox
          changeViewDashboard={this.props.viewActions.changeViewDashboard}
          changeViewCourseCreator={this.props.viewActions.changeViewCourseCreator} />
        {(this.props.view[0].currentView === 'course-creator')
          ? <CourseCreator
              initCourse={this.props.courseActions.initCourse}
              sortAssignments={this.props.assignmentActions.sortAssignments}
              receiveAssignments={this.props.assignmentActions.receiveAssignments}
              changeViewDashboard={this.props.viewActions.changeViewDashboard} />
          : <Dashboard />
        }
      </div>
    );
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
