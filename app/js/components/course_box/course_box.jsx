var React = require('react');
var ReactDOM = require('react-dom');
var CourseForm = require(__dirname + '/create_course_form.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <CourseForm {...this.props} />
    );
  }
});
