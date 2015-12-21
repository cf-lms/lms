var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  handleCourseName: function(e) {
    this.setState({courseName: e.target.value})
  },

  handleCourseUrl: function(e) {
    this.setState({courseUrl: e.target.value})
  },

  handleCourseStartDate: function(e) {
    this.setState({courseStartDate: e.target.value})
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.initCourse(this.state.courseName, this.state.CourseUrl, this.state.courseStartDate, this.props.sortAssignments, this.props.receiveAssignments, this.props.changeViewDashboard);
  },

  render: function() {
    return (
      <form id="courseForm">
        <label htmlFor="course-name">Course Name</label>
        <input type="text" name="course-name" onChange={this.handleCourseName} />

        <label htmlFor="course-master-url">Link to Course Master Markdown File</label>
        <input type="url" name="course-master-url" onChange={this.handleCourseUrl} />

        <label htmlFor="course-start-date">Start Date</label>
        <input type="date" name="course-start-date" onChange={this.handleCourseStartDate} />
        <button type="submit" onSubmit={this.handleSubmit}>Create Course</button>
      </form>
    );
  }
});
