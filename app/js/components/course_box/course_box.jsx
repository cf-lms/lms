var React = require('react');
var ReactDOM = require('react-dom');
var CourseForm = require(__dirname + '/create_course_form.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="create-course">
        <h2>Create Course</h2>
        <CourseForm {...this.props} />
      </div>
    );
  }
});
