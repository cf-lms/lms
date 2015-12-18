var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (
      <aside>
        <a href="#"><img className="cadet-logo" src="images/cadet-logo.svg" alt="cadet logo" /></a>
        <a href="#" className="icon-home"></a>
        <a href="#" className="icon-files-empty"></a>
        <a href="#" className="icon-cog"></a>
      </aside>
    );
  }
});
