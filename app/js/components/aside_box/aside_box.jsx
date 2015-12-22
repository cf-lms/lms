var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  handleHomeClick: function(e) {
    e.preventDefault();
    this.props.changeViewDashboard();
  },

  handleCourseCreatorClick: function(e) {
    e.preventDefault();
    this.props.changeViewCourseCreator();
  },

  render: function() {
    return (
      <nav>
        <ul>
          <li><a href="#"><img className="cadet-logo" src="images/cadet-logo.svg" alt="cadet logo" height="70" width="70"/></a></li>
          <li><a href="#" className="icon-home" onClick={this.handleHomeClick}></a></li>
          <li><a href="#" className="icon-cog" onClick={this.handleCourseCreatorClick}></a></li>
        </ul>
      </nav>
    );
  }
});
