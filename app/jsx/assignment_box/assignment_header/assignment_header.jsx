var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (

      <h1>{this.props.header}</h1>
    );
  }
});
