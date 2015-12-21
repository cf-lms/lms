var React = require('react');
var ReactDOM = require('react-dom');
var CourseBox = require(__dirname + '/../components/course_box/course_box.jsx');

var CourseCreator = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <CourseBox {...this.props} />
      </div>
    );
  }
});
