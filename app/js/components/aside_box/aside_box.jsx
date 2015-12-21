var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (
      <nav>
        <a href="#"><img className="cadet-logo" src="images/cadet-logo.svg" alt="cadet logo" height="70" width="70"/></a>
        <a href="#" className="icon-home"></a>
        <a href="#" className="icon-files-empty"></a>
        <a href="#" className="icon-cog"></a>
      </nav>
    );
  }
});
