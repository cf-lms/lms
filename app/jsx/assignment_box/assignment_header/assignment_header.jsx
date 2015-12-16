var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({


  onClick: function() {
    this.props.onExpandClick();
  },

  render: function() {
    return (

      <h1 onClick={this.onClick}>{this.props.header}{this.props.expand ? '-' : '+'}</h1>
    );
  }
});
